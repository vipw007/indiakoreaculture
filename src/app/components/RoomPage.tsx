import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, collection, onSnapshot, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { Send, User, Phone, Video as VideoIcon } from 'lucide-react';
import { auth } from '../firebase';

interface Room {
  id: string;
  title: string;
  description: string;
}

interface Message {
    id: string;
    text: string;
    sender: string;
    senderId: string;
    timestamp: any;
}

export function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!roomId) return;

    const fetchRoomDetails = async () => {
      setLoading(true);
      try {
        const roomDocRef = doc(db, 'communityRooms', roomId);
        const roomDoc = await getDoc(roomDocRef);
        if (roomDoc.exists()) {
          setRoom({ id: roomDoc.id, ...roomDoc.data() } as Room);
        } else {
          console.error("Room not found");
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
      }
      setLoading(false);
    };

    fetchRoomDetails();

    const messagesCollectionRef = collection(db, 'communityRooms', roomId, 'messages');
    const q = query(messagesCollectionRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
        setMessages(msgs);
    });

    return () => unsubscribe();

  }, [roomId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !roomId || !currentUser) return;

    const messagesCollectionRef = collection(db, 'communityRooms', roomId, 'messages');
    await addDoc(messagesCollectionRef, {
        text: newMessage,
        sender: currentUser.displayName || 'Anonymous',
        senderId: currentUser.uid,
        timestamp: serverTimestamp()
    });

    setNewMessage('');
  };

  const handleStartCall = (type: 'audio' | 'video') => {
    alert(`Starting ${type} call in room ${room?.title || roomId}... (feature to be implemented)`);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading room...</div>;
  }

  if (!room) {
    return <div className="flex justify-center items-center h-screen">Room not found.</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
        <header className="bg-white shadow-md p-4 sticky top-0 z-10 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">{room.title}</h1>
                <p className="text-sm text-gray-600">{room.description}</p>
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

        <main className="flex-1 p-4 overflow-y-auto">
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

        <footer className="bg-white p-4 sticky bottom-0 z-10">
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