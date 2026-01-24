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

interface CallModalProps {
  callId: string | null;
  onClose: () => void;
  onNewCallId: (callId: string) => void;
  callType: 'audio' | 'video';
}

const servers = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

const CallModal: React.FC<CallModalProps> = ({ callId: initialCallId, onClose, onNewCallId, callType }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(callType === 'audio');
  const [permissionError, setPermissionError] = useState<string | null>(null);
  
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const pc = useRef<RTCPeerConnection | null>(null);
  const callIdRef = useRef<string | null>(initialCallId);

  useEffect(() => {
    let isMounted = true;
    const subscriptions: Unsubscribe[] = [];
    const pcInstance = new RTCPeerConnection(servers);
    pc.current = pcInstance;

    const setupCall = async () => {
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
            if (pcInstance.remoteDescription) { // Check if remote description is set
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
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
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

  const isVideoCall = callType === 'video';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg p-4 w-full max-w-4xl">
        {permissionError ? (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Permission Denied</h2>
            <p className="text-gray-700">{permissionError}</p>
            <button onClick={onClose} className="mt-4 px-4 py-2 rounded bg-red-500 text-white">
              Close
            </button>
          </div>
        ) : isVideoCall ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-auto rounded bg-gray-900" />
              <p className="text-center">Local</p>
              <VolumeIndicator stream={localStream} />
            </div>
            <div className="relative">
              <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-auto rounded bg-gray-900" />
              <p className="text-center">Remote</p>
              <VolumeIndicator stream={remoteStream} />
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Audio Call in Progress</h2>
            <audio ref={remoteVideoRef} autoPlay playsInline />
            <div className="flex justify-center items-center mt-4">
                <p className="mr-2">Remote User:</p>
                <VolumeIndicator stream={remoteStream} />
            </div>
          </div>
        )}
        {!permissionError && (
          <div className="flex justify-center space-x-4 mt-4">
            <button onClick={handleToggleMute} className={`px-4 py-2 rounded ${isMuted ? 'bg-yellow-500' : 'bg-gray-300'}`}>
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
            {isVideoCall && (
              <button onClick={handleToggleCamera} className={`px-4 py-2 rounded ${isCameraOff ? 'bg-yellow-500' : 'bg-gray-300'}`}>
                {isCameraOff ? 'Camera On' : 'Camera Off'}
              </button>
            )}
            <button onClick={() => hangUp()} className="px-4 py-2 rounded bg-red-500 text-white">
              Hang Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallModal;
