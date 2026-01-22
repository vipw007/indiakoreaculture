import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase';
import { doc, getDoc, collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { Send, User, Phone, Video as VideoIcon, Copy } from 'lucide-react';
import { auth } from '../firebase';

interface GroupChat {
  id: string;
  topic: string;
  createdAt: any;
}

interface Message {
    id: string;
    text: string;
    sender: string;
    senderId: string;
    timestamp: any;
}

export function GroupChatPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const [groupChat, setGroupChat] = useState<GroupChat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!chatId) {
      navigate('/community');
      return;
    }

    const fetchGroupChatDetails = async () => {
      setLoading(true);
      try {
        const chatDocRef = doc(db, 'groupChats', chatId);
        const chatDoc = await getDoc(chatDocRef);
        if (chatDoc.exists()) {
          setGroupChat({ id: chatDoc.id, ...chatDoc.data() } as GroupChat);
        } else {
          console.error("Group chat not found");
          alert("This chat room does not exist.");
          navigate('/community');
        }
      } catch (error) {
        console.error("Error fetching group chat details:", error);
      }
      setLoading(false);
    };

    fetchGroupChatDetails();

    const messagesCollectionRef = collection(db, 'groupChats', chatId, 'messages');
    const q = query(messagesCollectionRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
        setMessages(msgs);
    });

    return () => unsubscribe();

  }, [chatId, navigate]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !chatId || !currentUser) return;

    const messagesCollectionRef = collection(db, 'groupChats', chatId, 'messages');
    await addDoc(messagesCollectionRef, {
        text: newMessage,
        sender: currentUser.displayName || 'Anonymous',
        senderId: currentUser.uid,
        timestamp: serverTimestamp()
    });

    setNewMessage('');
  };

  const handleStartCall = (type: 'audio' | 'video') => {
    alert(`Starting ${type} call in chat for ${groupChat?.topic}... (feature to be implemented)`);
  };

  const copyChatId = () => {
    if (chatId) {
      navigator.clipboard.writeText(chatId);
      alert('Chat ID copied to clipboard!');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading chat...</div>;
  }

  if (!groupChat) {
    return <div className="flex justify-center items-center h-screen">Chat room not found.</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
        <header className="bg-white shadow-md p-4 z-10 flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Topic: {groupChat.topic}</h1>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Share ID: {groupChat.id}</span>
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

        <main ref={messagesContainerRef} className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex items-start gap-3 ${msg.senderId === currentUser?.uid ? 'justify-end' : ''}`}>
                        {msg.senderId !== currentUser?.uid && <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0"><User size={16} /></div>}
                        <div className={`p-3 rounded-lg max-w-lg ${msg.senderId === currentUser?.uid ? 'bg-teal-500 text-white' : 'bg-white'}`}>
                            <p className="font-bold text-sm">{msg.senderId === currentUser?.uid ? 'Me' : msg.sender}</p>
                            <p>{msg.text}</p>
                        </div>
                         {msg.senderId === currentUser?.uid && <div className="bg-blue-300 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0"><User size={16} /></div>}
                    </div>
                ))}
            </div>
        </main>

        <footer className="bg-white p-4 z-10 flex-shrink-0">
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