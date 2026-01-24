import { db } from './firebase';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const servers = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

let pc: RTCPeerConnection | null = null;
let localStream: MediaStream | null = null;
let remoteStream: MediaStream | null = null;
let callId: string | null = null;
let onRemoteStream: ((stream: MediaStream) => void) | null = null;

export const createPeerConnection = () => {
  pc = new RTCPeerConnection(servers);

  pc.onicecandidate = (event) => {
    if (event.candidate && callId) {
      const callDocRef = doc(db, 'calls', callId);
      const candidatesCollection = collection(callDocRef, 'offerCandidates');
      addDoc(candidatesCollection, event.candidate.toJSON());
    }
  };

  pc.ontrack = (event) => {
    if (event.streams && event.streams[0]) {
      remoteStream = event.streams[0];
      if (onRemoteStream) {
        onRemoteStream(remoteStream);
      }
    }
  };
};

export const startCall = async (
  uid: string,
  _onRemoteStream: (stream: MediaStream) => void,
  callType: 'audio' | 'video'
) => {
  onRemoteStream = _onRemoteStream;
  createPeerConnection();

  const mediaConstraints =
    callType === 'video' ? { video: true, audio: true } : { audio: true };
  localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
  localStream.getTracks().forEach((track) => {
    pc?.addTrack(track, localStream!);
  });

  const callDocRef = doc(collection(db, 'calls'));
  callId = callDocRef.id;

  const offerDescription = await pc?.createOffer();
  await pc?.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription?.sdp,
    type: offerDescription?.type,
  };

  await setDoc(callDocRef, { offer, callerId: uid, callType });

  onSnapshot(callDocRef, (snapshot) => {
    const data = snapshot.data();
    if (!pc?.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc?.setRemoteDescription(answerDescription);
    }
  });

  const answerCandidates = collection(callDocRef, 'answerCandidates');
  onSnapshot(answerCandidates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc?.addIceCandidate(candidate);
      }
    });
  });

  return { localStream, callId };
};

export const answerCall = async (
  _callId: string,
  uid: string,
  _onRemoteStream: (stream: MediaStream) => void
) => {
  onRemoteStream = _onRemoteStream;
  callId = _callId;
  createPeerConnection();

  const callDocRef = doc(db, 'calls', callId);
  const callDoc = await getDoc(callDocRef);
  const callData = callDoc.data();
  const callType = callData?.callType || 'video'; // Default to video for backward compatibility

  const mediaConstraints =
    callType === 'video' ? { video: true, audio: true } : { audio: true };
  localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
  localStream.getTracks().forEach((track) => {
    pc?.addTrack(track, localStream!);
  });

  const offerDescription = callData?.offer;
  await pc?.setRemoteDescription(new RTCSessionDescription(offerDescription));

  const answerDescription = await pc?.createAnswer();
  await pc?.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
  };

  await updateDoc(callDocRef, { answer, calleeId: uid });

  const offerCandidates = collection(callDocRef, 'offerCandidates');
  onSnapshot(offerCandidates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc?.addIceCandidate(candidate);
      }
    });
  });

  return { localStream };
};

export const hangUp = async () => {
  if (pc) {
    pc.close();
  }
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
  }
  if (remoteStream) {
    remoteStream.getTracks().forEach((track) => track.stop());
  }

  if (callId) {
    const callDocRef = doc(db, 'calls', callId);
    await deleteDoc(callDocRef);
  }

  pc = null;
  localStream = null;
  remoteStream = null;
  callId = null;
  onRemoteStream = null;
};

export const toggleMute = (mute: boolean) => {
  if (localStream) {
    localStream.getAudioTracks()[0].enabled = !mute;
  }
};

export const toggleCamera = (cameraOn: boolean) => {
  if (localStream) {
    const videoTrack = localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = cameraOn;
    }
  }
};
