import React, { useEffect, useRef, useState } from 'react';
import { Mic } from 'lucide-react';

interface VolumeIndicatorProps {
  stream: MediaStream | null;
}

const VolumeIndicator: React.FC<VolumeIndicatorProps> = ({ stream }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (stream && stream.getAudioTracks().length > 0) {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const audioContext = audioContextRef.current;

      if (!analyserRef.current) {
        analyserRef.current = audioContext.createAnalyser();
        analyserRef.current.fftSize = 512;
      }
      const analyser = analyserRef.current;

      if (!sourceRef.current || sourceRef.current.mediaStream.id !== stream.id) {
        sourceRef.current = audioContext.createMediaStreamSource(stream);
        sourceRef.current.connect(analyser);
      }

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkVolume = () => {
        analyser.getByteTimeDomainData(dataArray);
        let sum = 0;
        for (const amplitude of dataArray) {
          sum += Math.abs(amplitude - 128);
        }
        const average = sum / dataArray.length;
        
        // Threshold can be adjusted based on testing
        if (average > 5) {
          setIsSpeaking(true);
        } else {
          setIsSpeaking(false);
        }
        animationFrameId.current = requestAnimationFrame(checkVolume);
      };

      animationFrameId.current = requestAnimationFrame(checkVolume);

    } else {
      setIsSpeaking(false);
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
    };
  }, [stream]);

  return (
    <div className={`absolute bottom-2 right-2 p-1 rounded-full transition-colors ${isSpeaking ? 'bg-green-500' : 'bg-gray-700 bg-opacity-50'}`}>
      <Mic size={16} className="text-white" />
    </div>
  );
};

export default VolumeIndicator;
