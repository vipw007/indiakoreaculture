import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase';
import { doc, getDoc, collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { Send, User, Phone, Video as VideoIcon, Copy } from 'lucide-react';
import { auth } from '../firebase';
import CallModal from './ui/CallModal';

interface PrivateChat {
  id: string;
  name: string;
}

interface Message {
    id: string;
    text: string;
    sender: string;
    senderId: string;
    timestamp: any;
    type?: string;
    callId?: string;
    callType?: 'audio' | 'video';
}

export function PrivateChatPage() {
  const { privateChatId } = useParams<{ privateChatId: string }>();
  const [privateChat, setPrivateChat] = useState<PrivateChat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;
  const [showCallModal, setShowCallModal] = useState(false);
  const [activeCallId, setActiveCallId] = useState<string | null>(null);
  const [activeCallType, setActiveCallType] = useState<'audio' | 'video'>('video');

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!privateChatId) return;

    const fetchPrivateChatDetails = async () => {
      setLoading(true);
      try {
        const chatDocRef = doc(db, 'privateRooms', privateChatId);
        const chatDoc = await getDoc(chatDocRef);
        if (chatDoc.exists()) {
          setPrivateChat({ id: chatDoc.id, ...chatDoc.data() } as PrivateChat);
        } else {
          console.error("Private chat not found");
        }
      } catch (error) {
        console.error("Error fetching private chat details:", error);
      }
      setLoading(false);
    };

    fetchPrivateChatDetails();

    const messagesCollectionRef = collection(db, 'privateRooms', privateChatId, 'messages');
    const q = query(messagesCollectionRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
        setMessages(msgs);
    });

    return () => unsubscribe();

  }, [privateChatId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !privateChatId || !currentUser) return;

    const messagesCollectionRef = collection(db, 'privateRooms', privateChatId, 'messages');
    await addDoc(messagesCollectionRef, {
        text: newMessage,
        sender: currentUser.displayName || 'Anonymous',
        senderId: currentUser.uid,
        timestamp: serverTimestamp()
    });

    setNewMessage('');
  };

  const handleStartCall = (type: 'audio' | 'video') => {
    setActiveCallId(null);
    setActiveCallType(type);
    setShowCallModal(true);
  };

  const handleJoinCall = (callId: string, callType: 'audio' | 'video') => {
    setActiveCallId(callId);
    setActiveCallType(callType);
    setShowCallModal(true);
  };

  const handleCloseModal = () => {
    setShowCallModal(false);
    setActiveCallId(null);
  };

  const handleNewCallId = async (callId: string) => {
    if (!privateChatId || !currentUser) return;
    const messagesCollectionRef = collection(db, 'privateRooms', privateChatId, 'messages');
    await addDoc(messagesCollectionRef, {
        text: `${currentUser.displayName || 'Anonymous'} started a ${activeCallType} call.`,
        sender: currentUser.displayName || 'Anonymous',
        senderId: currentUser.uid,
        timestamp: serverTimestamp(),
        type: 'call-invitation',
        callId: callId,
        callType: activeCallType,
    });
  };

  const copyChatId = () => {
    if (privateChatId) {
      navigator.clipboard.writeText(privateChatId);
      alert('Chat ID copied to clipboard!');
    }
  };

  if (loading) {
    return <div className="fixed inset-0 z-[100] flex justify-center items-center bg-white">Loading private chat...</div>;
  }

  if (!privateChat) {
    return <div className="fixed inset-0 z-[100] flex justify-center items-center bg-white">Private chat not found.</div>;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-gray-100 flex flex-col">
      {showCallModal && (
        <CallModal
          callId={activeCallId}
          onClose={handleCloseModal}
          onNewCallId={handleNewCallId}
          callType={activeCallType}
        />
      )}
      <header className="bg-white shadow-md p-4 flex items-center justify-between flex-shrink-0">
          <div>
              <h1 className="text-2xl font-bold text-gray-800">{privateChat.name}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Share ID: {privateChat.id}</span>
                  <button onClick={copyChatId} className="hover:text-teal-600" title="Copy Chat ID">
                      <Copy size={16} />
                  </button>
              </div>
          </div>
          <div className="flex gap-2">
              <button
                  onClick={() => handleStartCall('audio')}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                  title="Start Audio Call"
              >
                  <Phone size={20} />
              </button>
              <button
                  onClick={() => handleStartCall('video')}
                  className="bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600"
                  title="Start Video Call"
              >
                  <VideoIcon size={20} />
              </button>
          </div>
      </header>

      <main ref={messagesContainerRef} className="flex-1 p-4 overflow-y-auto min-h-0">
          <div className="space-y-4">
              {messages.map(msg => {
                  if (msg.type === 'call-invitation' && msg.callId) {
                      return (
                          <div key={msg.id} className={`flex items-start gap-3 ${msg.senderId === currentUser?.uid ? 'justify-end' : 'justify-start'}`}>
                              <div className="p-3 rounded-lg bg-yellow-200 text-center">
                                  <p>{msg.text}</p>
                                  {msg.senderId !== currentUser?.uid && (
                                    <button
                                        onClick={() => handleJoinCall(msg.callId!, msg.callType || 'video')}
                                        className="mt-2 px-4 py-2 rounded bg-green-500 text-white"
                                    >
                                        Join Call
                                    </button>
                                  )}
                              </div>
                          </div>
                      );
                  }
                  return (
                      <div key={msg.id} className={`flex items-start gap-3 ${msg.senderId === currentUser?.uid ? 'justify-end' : ''}`}>
                          {msg.senderId !== currentUser?.uid && <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0"><User size={16} /></div>}
                          <div className={`p-3 rounded-lg max-w-lg ${msg.senderId === currentUser?.uid ? 'bg-teal-500 text-white' : 'bg-white'}`}>
                              <p className="font-bold text-sm">{msg.senderId === currentUser?.uid ? 'Me' : msg.sender}</p>
                              <p>{msg.text}</p>
                          </div>
                          {msg.senderId === currentUser?.uid && <div className="bg-blue-300 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0"><User size={16} /></div>}
                      </div>
                  );
              })}
          </div>
      </main>

      <footer className="bg-white p-4 flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={currentUser ? "Type your message..." : "Please log in to chat"}
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  disabled={!currentUser}
              />
              <button type="submit" className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 disabled:bg-gray-400" disabled={!currentUser}>
                  <Send size={20} />
              </button>
          </form>
      </footer>
    </div>
  );
}
