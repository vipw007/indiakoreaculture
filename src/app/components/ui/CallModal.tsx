import React, { useEffect, useRef, useState } from 'react';
import { db, auth } from '../../firebase';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  getDocs,
  Unsubscribe,
} from 'firebase/firestore';
import VolumeIndicator from './VolumeIndicator';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';

interface CallModalProps {
  callId: string | null;
  onClose: () => void;
  onNewCallId: (callId: string) => void;
  callType: 'audio' | 'video';
}

// Helper function to fetch TURN credentials from your Firebase Function
const getIceServers = async () => {
  const response = await fetch(
    "https://us-central1-indokorean.cloudfunctions.net/getTurnCredentials"
  );

  const data = await response.json();

  return {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      ...data.iceServers,
    ],
  };
};


const CallModal: React.FC<CallModalProps> = ({ callId: initialCallId, onClose, onNewCallId, callType }) => {
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const pipVideoRef = useRef<HTMLVideoElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(callType === 'audio');
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [status, setStatus] = useState('Connecting...');
  const [uiVisible, setUiVisible] = useState(true);
  
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  
  const [localUser, setLocalUser] = useState(auth.currentUser?.displayName || 'You');
  const [remoteUser, setRemoteUser] = useState('Remote User');
  const [mainView, setMainView] = useState<'remote' | 'local'>('remote');

  const pc = useRef<RTCPeerConnection | null>(null);
  const callIdRef = useRef<string | null>(initialCallId);

  useEffect(() => {
    let isMounted = true;
    const subscriptions: Unsubscribe[] = [];
    
    const setupCall = async () => {
      const iceConfig = await getIceServers();
      const pcInstance = new RTCPeerConnection({
        ...iceConfig,
        iceCandidatePoolSize: 10,
      });
      pc.current = pcInstance;

      pcInstance.onconnectionstatechange = () => {
          if (isMounted) {
              setStatus(pcInstance.connectionState);
          }
      };

      try {
        const uid = auth.currentUser?.uid;
        if (!uid) throw new Error('User not authenticated');

        const mediaConstraints = callType === 'video' ? { video: true, audio: true } : { audio: true };
        const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        
        if (!isMounted) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }
        
        setLocalStream(stream);

        stream.getTracks().forEach(track => {
          pcInstance.addTrack(track, stream);
        });

        pcInstance.ontrack = (event) => {
          if (isMounted) {
            setRemoteStream(event.streams[0]);
          }
        };

        if (initialCallId) {
          await answerCall(pcInstance, uid, initialCallId);
        } else {
          await startCall(pcInstance, uid);
        }
      } catch (error: any) {
        if (!isMounted) return;
        if (error.name === 'NotAllowedError') {
          setPermissionError('Permission to use camera and microphone was denied. Please allow access in your browser settings and try again.');
        } else {
          console.error("Error during call setup:", error);
          onClose();
        }
      }
    };

    const fetchRemoteUser = async (userId: string) => {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists() && isMounted) {
            setRemoteUser(userDoc.data().displayName || 'Remote User');
        }
    };

    const startCall = async (pcInstance: RTCPeerConnection, uid: string) => {
      const callDocRef = doc(collection(db, 'calls'));
      callIdRef.current = callDocRef.id;
      const queuedCandidates: RTCIceCandidateInit[] = [];

      pcInstance.onicecandidate = (event) => {
        if (event.candidate) addDoc(collection(callDocRef, 'offerCandidates'), event.candidate.toJSON());
      };

      const offerDescription = await pcInstance.createOffer();
      await pcInstance.setLocalDescription(offerDescription);

      await setDoc(callDocRef, { offer: { sdp: offerDescription.sdp, type: offerDescription.type }, callerId: uid, callType });
      onNewCallId(callDocRef.id);

      subscriptions.push(onSnapshot(callDocRef, async (snapshot) => {
        const data = snapshot.data();
        if (!pcInstance.currentRemoteDescription && data?.answer) {
          await pcInstance.setRemoteDescription(new RTCSessionDescription(data.answer));
          queuedCandidates.forEach(candidate => pcInstance.addIceCandidate(new RTCIceCandidate(candidate)));
          queuedCandidates.length = 0;
          if (data.calleeId) fetchRemoteUser(data.calleeId);
        }
      }));

      subscriptions.push(onSnapshot(collection(callDocRef, 'answerCandidates'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const candidate = change.doc.data();
            if (pcInstance.currentRemoteDescription) {
              pcInstance.addIceCandidate(new RTCIceCandidate(candidate));
            } else {
              queuedCandidates.push(candidate);
            }
          }
        });
      }));
    };

    const answerCall = async (pcInstance: RTCPeerConnection, uid: string, callId: string) => {
      const callDocRef = doc(db, 'calls', callId);
      const callDoc = await getDoc(callDocRef);
      if (!callDoc.exists()) throw new Error("Call document does not exist!");
      const queuedCandidates: RTCIceCandidateInit[] = [];

      if (callDoc.data().callerId) fetchRemoteUser(callDoc.data().callerId);

      pcInstance.onicecandidate = (event) => {
        if (event.candidate) addDoc(collection(callDocRef, 'answerCandidates'), event.candidate.toJSON());
      };

      await pcInstance.setRemoteDescription(new RTCSessionDescription(callDoc.data().offer));
      const answerDescription = await pcInstance.createAnswer();
      await pcInstance.setLocalDescription(answerDescription);

      await updateDoc(callDocRef, { answer: { type: answerDescription.type, sdp: answerDescription.sdp }, calleeId: uid });

      subscriptions.push(onSnapshot(collection(callDocRef, 'offerCandidates'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const candidate = change.doc.data();
            if (pcInstance.remoteDescription) {
              pcInstance.addIceCandidate(new RTCIceCandidate(candidate));
            } else {
              queuedCandidates.push(candidate);
            }
          }
        });
      }));
    };

    setupCall();

    return () => {
      isMounted = false;
      subscriptions.forEach(sub => sub());
      if (pc.current) {
        pc.current.close();
      }
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (mainView === 'local') {
        if (mainVideoRef.current) mainVideoRef.current.srcObject = localStream;
        if (pipVideoRef.current) pipVideoRef.current.srcObject = remoteStream;
    } else {
        if (mainVideoRef.current) mainVideoRef.current.srcObject = remoteStream;
        if (pipVideoRef.current) pipVideoRef.current.srcObject = localStream;
    }
  }, [localStream, remoteStream, mainView]);

  useEffect(() => {
    if (remoteAudioRef.current && remoteStream) {
      remoteAudioRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);


  const hangUp = async () => {
    if (pc.current) {
        pc.current.close();
    }
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }
    if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
    }

    if (callIdRef.current) {
        const callDocRef = doc(db, 'calls', callIdRef.current);
        const callDoc = await getDoc(callDocRef);
        if (callDoc.exists() && callDoc.data().callerId === auth.currentUser?.uid) {
          const offerCandidates = collection(callDocRef, 'offerCandidates');
          const answerCandidates = collection(callDocRef, 'answerCandidates');
          
          getDocs(offerCandidates).then(snapshot => snapshot.forEach(doc => deleteDoc(doc.ref)));
          getDocs(answerCandidates).then(snapshot => snapshot.forEach(doc => deleteDoc(doc.ref)));
          
          deleteDoc(callDocRef);
        }
      }
    onClose();
  };

  const handleToggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks()[0].enabled = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleToggleCamera = () => {
    if (localStream && callType === 'video') {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isCameraOff;
        setIsCameraOff(!isCameraOff);
      }
    }
  };

  const toggleMainView = () => {
    setMainView(prev => prev === 'local' ? 'remote' : 'local');
  };

  const isVideoCall = callType === 'video';

  return (
    <div className="fixed inset-0 bg-black z-50" onClick={() => setUiVisible(!uiVisible)}>
      <div className="relative w-full h-full">
        {permissionError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-white p-4">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Permission Denied</h2>
            <p className="text-center">{permissionError}</p>
            <button onClick={onClose} className="mt-4 px-4 py-2 rounded bg-red-500 text-white">
              Close
            </button>
          </div>
        ) : isVideoCall ? (
          <>
            {/* Main Video View */}
            <video ref={mainVideoRef} autoPlay playsInline muted={mainView === 'local'} className="w-full h-full object-cover" />
            
            {/* Picture-in-Picture View */}
            <div className="absolute top-4 right-4 w-32 h-48 md:w-48 md:h-64 rounded-lg overflow-hidden shadow-lg cursor-pointer border-2 border-white" onClick={toggleMainView}>
                <video ref={pipVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            </div>

            <div className={`absolute top-4 left-4 transition-opacity duration-300 ${uiVisible ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-white text-lg font-bold">{mainView === 'local' ? remoteUser : localUser}</p>
                <p className="text-white capitalize">{status}</p>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white">
            <h2 className="text-3xl font-bold mb-4">Audio Call</h2>
            <p className="text-xl mb-4">with {remoteUser}</p>
            <audio ref={remoteAudioRef} autoPlay playsInline />
            <div className="flex items-center mt-4">
                <p className="mr-2">Speaking:</p>
                <VolumeIndicator stream={remoteStream} />
            </div>
            <p className="mt-4 capitalize">{status}</p>
          </div>
        )}
        
        {/* Controls */}
        <div className={`absolute bottom-0 left-0 right-0 flex justify-center items-center space-x-4 p-4 bg-black bg-opacity-25 transition-opacity duration-300 ${uiVisible ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={handleToggleMute} className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-red-500 text-white' : 'bg-gray-700 text-white'}`}>
            {isMuted ? <MicOff /> : <Mic />}
          </button>
          {isVideoCall && (
            <button onClick={handleToggleCamera} className={`p-4 rounded-full transition-colors ${isCameraOff ? 'bg-red-500 text-white' : 'bg-gray-700 text-white'}`}>
              {isCameraOff ? <VideoOff /> : <Video />}
            </button>
          )}
          <button onClick={hangUp} className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700">
            <PhoneOff />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallModal;
