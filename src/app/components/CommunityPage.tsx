import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase'; // Import auth
import { collection, getDocs, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { Users, Calendar, MessageSquare, Video, Shield, TrendingUp, Mic, Video as VideoIcon, PlusCircle, LogIn } from 'lucide-react';

// Interfaces from your existing code
interface Room {
  id: string;
  title: string;
  category: 'office' | 'travel' | 'culture';
  description: string;
  members: number;
  activeNow: number;
  icon: string;
}

interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'audio' | 'text';
  host: string;
  participants: number;
  maxParticipants: number;
}

export function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUser = auth.currentUser; // Get current user

  // State for joining any chat by ID
  const [chatIdToJoin, setChatIdToJoin] = useState('');
  // State for creating a new private room
  const [newPrivateRoomName, setNewPrivateRoomName] = useState('');

  useEffect(() => {
    const fetchCommunityData = async () => {
      setLoading(true);
      try {
        const roomsCollection = collection(db, 'communityRooms');
        const roomsSnapshot = await getDocs(roomsCollection);
        const roomsData = roomsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room));
        setRooms(roomsData);

        const sessionsCollection = collection(db, 'upcomingSessions');
        const sessionsSnapshot = await getDocs(sessionsCollection);
        const sessionsData = sessionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Session));
        setUpcomingSessions(sessionsData);
      } catch (error) {
        console.error("Error fetching community data:", error);
      }
      setLoading(false);
    };

    fetchCommunityData();
  }, []);

  const filteredRooms = selectedCategory
    ? rooms.filter(r => r.category === selectedCategory)
    : rooms;

  const handleCreateTopicGroupChat = async (topicTitle: string) => {
    if (!currentUser) {
      alert('Please log in to start a new chat.');
      return;
    }
    try {
      const groupChatsCollection = collection(db, 'groupChats');
      const newChatDoc = await addDoc(groupChatsCollection, {
        topic: topicTitle,
        createdAt: serverTimestamp(),
      });
      navigate(`/group-chat/${newChatDoc.id}`);
    } catch (error) {
      console.error("Error creating topic group chat:", error);
      alert('Failed to create topic group chat. Please try again.');
    }
  };

  const handleCreatePrivateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please log in to create a private room.');
      return;
    }
    if (!newPrivateRoomName.trim()) {
      alert('Please enter a name for your private room.');
      return;
    }
    try {
      const privateRoomsCollection = collection(db, 'privateRooms');
      const newRoomDoc = await addDoc(privateRoomsCollection, {
        name: newPrivateRoomName,
        createdAt: serverTimestamp(),
      });
      setNewPrivateRoomName('');
      navigate(`/private-chat/${newRoomDoc.id}`);
    } catch (error) {
      console.error("Error creating private room:", error);
      alert('Failed to create private room. Please try again.');
    }
  };

  const handleJoinAnyChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please log in to join a chat.');
      return;
    }
    const trimmedChatId = chatIdToJoin.trim();
    if (!trimmedChatId) {
      alert('Please enter a chat ID.');
      return;
    }

    try {
      const privateChatDocRef = doc(db, 'privateRooms', trimmedChatId);
      const privateChatDoc = await getDoc(privateChatDocRef);

      if (privateChatDoc.exists()) {
        navigate(`/private-chat/${trimmedChatId}`);
        return;
      }

      const groupChatDocRef = doc(db, 'groupChats', trimmedChatId);
      const groupChatDoc = await getDoc(groupChatDocRef);

      if (groupChatDoc.exists()) {
        navigate(`/group-chat/${trimmedChatId}`);
        return;
      }

      alert('No chat room found with that ID.');
    } catch (error) {
      console.error("Error joining chat:", error);
      alert('An error occurred while trying to join the chat.');
    }
  };
  
  const handleJoinCall = (type: 'audio' | 'video') => {
    if (!currentUser) {
      alert(`Please log in to join ${type} calls.`);
      return;
    }
    alert(`Joining ${type} call... (feature to be implemented)`);
  };

  const authTooltip = "Please log in to use this feature";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-10 w-10" />
            <h1 className="text-4xl md:text-5xl">Community Connection</h1>
          </div>
          <p className="text-xl text-green-100 max-w-3xl">
            Join topic-based rooms, create private chats, and connect with others through audio and video calls.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h2 className="text-xl mb-4 text-gray-900">Private & Group Chat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form onSubmit={handleCreatePrivateRoom}>
              <label htmlFor="new-private-room-name" className="block text-sm font-medium text-gray-700 mb-1">Create a new private room</label>
              <div className="flex gap-2">
                <input
                  id="new-private-room-name"
                  type="text"
                  value={newPrivateRoomName}
                  onChange={(e) => setNewPrivateRoomName(e.target.value)}
                  placeholder={!currentUser ? "Log in to create a room" : "Enter room name"}
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  disabled={!currentUser}
                  title={!currentUser ? authTooltip : ""}
                />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!currentUser} title={!currentUser ? authTooltip : "Create a new private room"}>
                  <PlusCircle size={18} /> Create
                </button>
              </div>
            </form>
            <form onSubmit={handleJoinAnyChat}>
              <label htmlFor="chat-id-to-join" className="block text-sm font-medium text-gray-700 mb-1">Join any chat with an ID</label>
              <div className="flex gap-2">
                <input
                  id="chat-id-to-join"
                  type="text"
                  value={chatIdToJoin}
                  onChange={(e) => setChatIdToJoin(e.target.value)}
                  placeholder={!currentUser ? "Log in to join a chat" : "Enter chat ID"}
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  disabled={!currentUser}
                  title={!currentUser ? authTooltip : ""}
                />
                <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!currentUser} title={!currentUser ? authTooltip : "Join an existing chat"}>
                  <LogIn size={18} /> Join
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl mb-4 text-gray-900">Browse by Topic</h2>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setSelectedCategory(null)} className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === null ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>All Rooms</button>
            <button onClick={() => setSelectedCategory('office')} className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === 'office' ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>💼 Office Life</button>
            <button onClick={() => setSelectedCategory('travel')} className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === 'travel' ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>✈️ Travel Help</button>
            <button onClick={() => setSelectedCategory('culture')} className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === 'culture' ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>🎭 Culture Questions</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl mb-4 text-gray-900">Topic-Based Rooms</h2>
            {loading ? <p>Loading rooms...</p> : filteredRooms.length > 0 ? (
              <div className="space-y-4">
                {filteredRooms.map((room) => (
                  <div key={room.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{room.icon}</span>
                        <div>
                          <h3 className="text-lg text-gray-900">{room.title}</h3>
                          <p className="text-sm text-gray-600">{room.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1"><Users className="h-4 w-4" /><span>{room.members.toLocaleString()} members</span></div>
                      <div className="flex items-center gap-1"><TrendingUp className="h-4 w-4 text-green-600" /><span className="text-green-600">{room.activeNow} active now</span></div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button onClick={() => handleCreateTopicGroupChat(room.title)} className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!currentUser} title={!currentUser ? authTooltip : `Start a new chat about ${room.title}`}>
                        <MessageSquare className="h-4 w-4" /> Start New Chat
                      </button>
                      <button onClick={() => handleJoinCall('audio')} className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!currentUser} title={!currentUser ? authTooltip : "Join Audio Call"}>
                        <Mic className="h-4 w-4" /> Join Audio Call
                      </button>
                      <button onClick={() => handleJoinCall('video')} className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!currentUser} title={!currentUser ? authTooltip : "Join Video Call"}>
                        <VideoIcon className="h-4 w-4" /> Join Video Call
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p>No rooms available at the moment. Please check back later.</p>}
          </div>
          <div>
            <h2 className="text-xl mb-4 text-gray-900">Upcoming Sessions</h2>
            {loading ? <p>Loading sessions...</p> : upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="text-base text-gray-900 mb-2">{session.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>{session.date}</span></div>
                      <div className="flex items-center gap-2">{session.type === 'audio' ? <Video className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}<span>{session.time} • {session.type === 'audio' ? 'Audio' : 'Text'}</span></div>
                      <div className="flex items-center gap-2"><Users className="h-4 w-4" /><span>{session.host}</span></div>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1"><span>{session.participants} joined</span><span>{session.maxParticipants} max</span></div>
                      <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-teal-600 h-2 rounded-full" style={{ width: `${(session.participants / session.maxParticipants) * 100}%` }} /></div>
                    </div>
                    <button className="w-full bg-white border border-teal-600 text-teal-600 py-2 rounded-lg hover:bg-teal-50 transition-colors text-sm disabled:bg-gray-200 disabled:cursor-not-allowed" disabled={!currentUser} title={!currentUser ? authTooltip : "Register for this session"}>Register</button>
                  </div>
                ))}
              </div>
            ) : <p>No upcoming sessions scheduled.</p>}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-sm mb-2 text-gray-900">Community Guidelines</h3>
              <ul className="space-y-1 text-xs text-gray-700">
                <li>• Be respectful and courteous</li>
                <li>• No harassment or hate speech</li>
                <li>• Stay on topic in each room</li>
                <li>• No spam or self-promotion</li>
                <li>• Protect your privacy</li>
                <li>• Report violations to moderators</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}