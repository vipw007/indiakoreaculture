import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { db, auth } from '../firebase';
import { collection, getDocs, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { Users, Calendar, MessageSquare, Video, Shield, TrendingUp, Mic, Video as VideoIcon, PlusCircle, LogIn, Hash, Globe, Lock } from 'lucide-react';

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
  const currentUser = auth.currentUser;

  const [chatIdToJoin, setChatIdToJoin] = useState('');
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
      <Helmet>
        <title>Community Connection - Chat & Sessions | IndoKorean</title>
        <meta name="description" content="Join topic-based chat rooms, create private groups, and connect with others through audio and video calls to discuss Indian and Korean culture." />
      </Helmet>
      
      {/* Header with Background Image */}
      <div className="relative py-24 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=3132&auto=format&fit=crop"
            alt="Community Connection" 
            className="w-full h-full object-cover"
          />
          {/* Transparent overlay to show image colors clearly */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/30">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Community Connection</h1>
          </div>
          <p className="text-xl md:text-2xl text-white max-w-3xl leading-relaxed drop-shadow-md">
            Join topic-based rooms, create private chats, and connect with others through audio and video calls.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-teal-100 hover:shadow-xl transition-all duration-500 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-teal-50 rounded-lg text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Lock size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Create Private Room</h2>
            </div>
            <form onSubmit={handleCreatePrivateRoom} className="space-y-4">
              <div className="flex gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-teal-400 focus-within:ring-4 focus-within:ring-teal-50 transition-all">
                <input
                  type="text"
                  value={newPrivateRoomName}
                  onChange={(e) => setNewPrivateRoomName(e.target.value)}
                  placeholder={!currentUser ? "Log in to create a room" : "Enter room name..."}
                  className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-700"
                  disabled={!currentUser}
                />
                <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 disabled:bg-gray-300" disabled={!currentUser}>
                  Create
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100 hover:shadow-xl transition-all duration-500 group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Hash size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Join with ID</h2>
            </div>
            <form onSubmit={handleJoinAnyChat} className="space-y-4">
              <div className="flex gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                <input
                  type="text"
                  value={chatIdToJoin}
                  onChange={(e) => setChatIdToJoin(e.target.value)}
                  placeholder={!currentUser ? "Log in to join a chat" : "Enter chat ID..."}
                  className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-700"
                  disabled={!currentUser}
                />
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:bg-gray-300" disabled={!currentUser}>
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Topic Filter */}
        <div className="mb-12">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Browse by Topic</h2>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setSelectedCategory(null)} className={`px-6 py-2.5 rounded-full transition-all font-bold text-sm border ${selectedCategory === null ? 'bg-teal-600 text-white border-teal-600 shadow-lg scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'}`}>All Rooms</button>
            <button onClick={() => setSelectedCategory('office')} className={`px-6 py-2.5 rounded-full transition-all font-bold text-sm border ${selectedCategory === 'office' ? 'bg-teal-600 text-white border-teal-600 shadow-lg scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'}`}>💼 Office Life</button>
            <button onClick={() => setSelectedCategory('travel')} className={`px-6 py-2.5 rounded-full transition-all font-bold text-sm border ${selectedCategory === 'travel' ? 'bg-teal-600 text-white border-teal-600 shadow-lg scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'}`}>✈️ Travel Help</button>
            <button onClick={() => setSelectedCategory('culture')} className={`px-6 py-2.5 rounded-full transition-all font-bold text-sm border ${selectedCategory === 'culture' ? 'bg-teal-600 text-white border-teal-600 shadow-lg scale-105' : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'}`}>🎭 Culture Questions</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Rooms List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Globe className="h-6 w-6 text-teal-600" />
              Topic-Based Rooms
            </h2>
            {loading ? (
              <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div></div>
            ) : filteredRooms.length > 0 ? (
              <div className="space-y-6">
                {filteredRooms.map((room) => (
                  <div key={room.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-500 group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                      <div className="flex items-start gap-5">
                        <div className="text-5xl bg-gray-50 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">{room.icon}</div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{room.title}</h3>
                          <p className="text-gray-500 leading-relaxed">{room.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-400">
                          <Users className="h-4 w-4" />
                          <span>{room.members.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm font-bold text-green-500 bg-green-50 px-3 py-1 rounded-full">
                          <TrendingUp className="h-3 w-3" />
                          <span>{room.activeNow} online</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button onClick={() => handleCreateTopicGroupChat(room.title)} className="flex items-center justify-center gap-2 bg-teal-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 active:scale-95 disabled:bg-gray-200" disabled={!currentUser}>
                        <MessageSquare size={18} /> Chat
                      </button>
                      <button onClick={() => handleJoinCall('audio')} className="flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 active:scale-95 disabled:bg-gray-200" disabled={!currentUser}>
                        <Mic size={18} /> Audio
                      </button>
                      <button onClick={() => handleJoinCall('video')} className="flex items-center justify-center gap-2 bg-purple-500 text-white py-3 px-4 rounded-xl font-bold hover:bg-purple-600 transition-all shadow-lg shadow-purple-100 active:scale-95 disabled:bg-gray-200" disabled={!currentUser}>
                        <VideoIcon size={18} /> Video
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-gray-500 italic">No rooms available at the moment.</p>}
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-teal-600" />
                Live Sessions
              </h2>
              <div className="space-y-6">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`p-1.5 rounded-lg ${session.type === 'audio' ? 'bg-blue-50 text-blue-600' : 'bg-teal-50 text-teal-600'}`}>
                        {session.type === 'audio' ? <Mic size={16} /> : <MessageSquare size={16} />}
                      </span>
                      <h3 className="font-bold text-gray-900">{session.title}</h3>
                    </div>
                    <div className="space-y-3 text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2"><Calendar size={14} /> {session.date} • {session.time}</div>
                      <div className="flex items-center gap-2"><Users size={14} /> Host: {session.host}</div>
                    </div>
                    <div className="mb-6">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                        <span>{session.participants} Joined</span>
                        <span>{session.maxParticipants} Max</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-teal-500 h-full transition-all duration-1000" style={{ width: `${(session.participants / session.maxParticipants) * 100}%` }} />
                      </div>
                    </div>
                    <button className="w-full py-3 rounded-xl font-bold border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all active:scale-95 disabled:bg-gray-50 disabled:border-gray-200 disabled:text-gray-300" disabled={!currentUser}>
                      Register Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-600 to-blue-700 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
                <Shield size={120} />
              </div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                <Shield className="h-5 w-5" />
                Community Rules
              </h3>
              <ul className="space-y-4 relative z-10">
                {[
                  { emoji: '🤝', text: 'Be respectful and courteous' },
                  { emoji: '🚫', text: 'No harassment or hate speech' },
                  { emoji: '📍', text: 'Stay on topic in each room' },
                  { emoji: '🔒', text: 'Protect your personal privacy' }
                ].map((rule, i) => (
                  <li key={i} className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10 text-sm">
                    <span>{rule.emoji}</span> {rule.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
