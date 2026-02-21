import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, User, Bot, Sparkles, MessageSquare, Info } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'vivek' | 'mryu';
  timestamp: Date;
}

interface QuickQuestion {
  question: string;
  vivekAnswer: string;
  mryuAnswer: string;
}

const quickQuestions: QuickQuestion[] = [
  {
    question: 'Why do Koreans stay late at the office?',
    vivekAnswer: 'In Korea, work culture emphasizes dedication and hierarchy. Leaving before your boss is often seen as disrespectful or lack of commitment. It\'s part of showing loyalty to the company.',
    mryuAnswer: '한국의 직장 문화는 헌신과 서열을 중시합니다. In Korea, we value collective harmony and showing dedication through presence. It\'s changing now with younger generation, but staying late shows respect for your seniors and commitment to team goals.',
  },
  {
    question: 'Is it rude to say no in India?',
    vivekAnswer: 'Not necessarily rude, but context matters! In India, we value relationships and hospitality. Saying "no" directly can feel harsh, so we often soften it with explanations. In professional settings, a respectful "no" with proper reasoning is acceptable.',
    mryuAnswer: '인도에서는 관계를 중시합니다. From what I understand, Indians are very hospitable and value personal connections. Like Korea, direct refusal can seem impolite, but they are generally more flexible than Korean culture in this aspect.',
  },
  {
    question: 'What food should I avoid offering to vegetarian Indians?',
    vivekAnswer: 'Avoid offering meat, fish, eggs, and any products containing animal gelatin. Many Indians are pure vegetarian. Always ask about preferences! Some are okay with eggs (eggetarian), but when in doubt, stick to pure vegetarian options. Also, check if they avoid onion and garlic (Jain diet).',
    mryuAnswer: '인도 채식주의는 매우 다양합니다. Be very careful - Indian vegetarianism is stricter than what we might consider vegetarian in Korea. Even fish sauce or meat-based broths are not okay. Always ask specifically about their dietary restrictions.',
  },
  {
    question: 'How do I address my Indian colleagues?',
    vivekAnswer: 'Use "Sir" or "Ma\'am" for seniors initially. First names are okay among peers once you know each other. In South India, adding "ji" to names shows respect (like "Ramesh-ji"). If someone is much older, treating them like family (Uncle/Aunty) is warm and appreciated!',
    mryuAnswer: '인도에도 존칭이 있습니다! India also has respect through titles. Use "Sir" or "Madam" like we use "님" in Korean. They\'re more flexible with first names among peers than Korea, but show respect to elders and seniors.',
  },
  {
    question: 'Can I wear shorts to office in India?',
    vivekAnswer: 'It depends on the company! IT companies in Bangalore, Pune, Mumbai are usually casual. But traditional offices or client-facing roles expect formal wear. For men, generally avoid shorts. For women, modest dress is appreciated. Observe your office culture first!',
    mryuAnswer: '회사 문화에 따라 다릅니다. Company culture varies, but generally India is more conservative than Korea in professional settings. IT companies are casual, but when representing company or meeting clients, formal dress is expected.',
  },
  {
    question: 'What are common greetings in Korea?',
    vivekAnswer: 'From what I know, Koreans bow when greeting. "안녕하세요" (Annyeonghaseyo) is the standard hello. The depth of bow shows respect level. They also have different speech levels based on age and status - quite formal compared to India!',
    mryuAnswer: '안녕하세요 (Annyeonghaseyo) is standard. Bow when greeting - deeper bow for seniors. We also ask "Did you eat?" (밥 먹었어요?) as a greeting. Always use formal speech (존댓말) with people you don\'t know well or who are older.',
  },
];

export function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! I\'m Vivek, your guide to Indian culture. 🙏',
      sender: 'vivek',
      timestamp: new Date(),
    },
    {
      id: '2',
      text: '안녕하세요! I\'m Mr. Yu, your guide to Korean culture. 🇰🇷',
      sender: 'mryu',
      timestamp: new Date(),
    },
    {
      id: '3',
      text: 'Ask us anything about cultural differences, workplace etiquette, or daily life! Click on quick questions below or type your own.',
      sender: 'vivek',
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<'both' | 'vivek' | 'mryu'>('both');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickQuestion = (question: QuickQuestion) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question.question,
      sender: 'user',
      timestamp: new Date(),
    };

    const newMessages = [userMessage];

    if (selectedGuide === 'both' || selectedGuide === 'vivek') {
      newMessages.push({
        id: (Date.now() + 1).toString(),
        text: question.vivekAnswer,
        sender: 'vivek',
        timestamp: new Date(),
      });
    }

    if (selectedGuide === 'both' || selectedGuide === 'mryu') {
      newMessages.push({
        id: (Date.now() + 2).toString(),
        text: question.mryuAnswer,
        sender: 'mryu',
        timestamp: new Date(),
      });
    }

    setMessages([...messages, ...newMessages]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    const responseMessages: Message[] = [];

    if (selectedGuide === 'both' || selectedGuide === 'vivek') {
      responseMessages.push({
        id: (Date.now() + 1).toString(),
        text: 'That\'s a great question! In India, this topic varies by region and context. Let me share some insights based on my experience...',
        sender: 'vivek',
        timestamp: new Date(),
      });
    }

    if (selectedGuide === 'both' || selectedGuide === 'mryu') {
      responseMessages.push({
        id: (Date.now() + 2).toString(),
        text: '좋은 질문입니다! In Korea, we approach this differently. Let me explain from Korean perspective...',
        sender: 'mryu',
        timestamp: new Date(),
      });
    }

    setMessages([...messages, userMessage, ...responseMessages]);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Chat with Vivek & Mr. Yu - AI Cultural Guides | IndoKorean</title>
        <meta name="description" content="Get instant answers to your cultural questions about India and Korea from our AI-powered guides, Vivek and Mr. Yu." />
      </Helmet>
      
      {/* Header with Background Image */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1762330465857-07e4c81c0dfa?q=80&w=1740&auto=format&fit=crop" 
            alt="Cultural Exchange" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-purple-900/60 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/30">
              <Sparkles className="h-10 w-10 text-yellow-300" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Ask Vivek & Mr. Yu</h1>
          </div>
          <p className="text-xl md:text-2xl text-purple-50 max-w-3xl leading-relaxed drop-shadow-md">
            Get instant answers to your cultural questions from our AI guides representing India and Korea
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] shadow-xl border border-purple-100 overflow-hidden flex flex-col h-[700px]">
              {/* Guide Selector */}
              <div className="bg-gray-50/50 backdrop-blur-sm border-b border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    <span className="font-bold text-gray-700 uppercase tracking-widest text-xs">Chat Session</span>
                  </div>
                  <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                    <button
                      onClick={() => setSelectedGuide('both')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedGuide === 'both' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      Both Guides
                    </button>
                    <button
                      onClick={() => setSelectedGuide('vivek')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedGuide === 'vivek' ? 'bg-orange-500 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      🇮🇳 Vivek
                    </button>
                    <button
                      onClick={() => setSelectedGuide('mryu')}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        selectedGuide === 'mryu' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      🇰🇷 Mr. Yu
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gradient-to-b from-white to-purple-50/30">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-4 ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border ${
                        message.sender === 'user'
                          ? 'bg-indigo-100 border-indigo-200'
                          : message.sender === 'vivek'
                          ? 'bg-orange-100 border-orange-200'
                          : 'bg-blue-100 border-blue-200'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="h-5 w-5 text-indigo-600" />
                      ) : (
                        <Bot
                          className={`h-5 w-5 ${
                            message.sender === 'vivek' ? 'text-orange-600' : 'text-blue-600'
                          }`}
                        />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl p-5 shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : message.sender === 'vivek'
                          ? 'bg-white border border-orange-100 text-gray-800 rounded-tl-none'
                          : 'bg-white border border-blue-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      {message.sender !== 'user' && (
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${message.sender === 'vivek' ? 'text-orange-500' : 'text-blue-500'}`}>
                          {message.sender === 'vivek' ? '🇮🇳 Vivek (India)' : '🇰🇷 Mr. Yu (Korea)'}
                        </p>
                      )}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-[9px] mt-2 opacity-50 ${message.sender === 'user' ? 'text-right' : ''}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 bg-white border-t border-gray-100">
                <div className="flex gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-purple-400 focus-within:ring-4 focus-within:ring-purple-100 transition-all">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about culture, food, or etiquette..."
                    className="flex-1 px-4 py-2 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 active:scale-95"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-4 text-gray-400">
                  <Info className="h-3 w-3" />
                  <p className="text-[10px] font-medium uppercase tracking-wider">
                    AI-Powered Cultural Insights • Vivek & Mr. Yu
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Questions Sidebar */}
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Quick Questions</h2>
              <div className="space-y-4">
                {quickQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(q)}
                    className="w-full text-left bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-purple-300 group"
                  >
                    <p className="text-sm text-gray-700 group-hover:text-purple-700 font-medium leading-relaxed">{q.question}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Bot className="h-24 w-24" />
              </div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Info className="h-5 w-5" />
                Your Guides
              </h3>
              <div className="space-y-6 relative z-10">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <p className="font-bold text-orange-300 mb-1">🇮🇳 Vivek</p>
                  <p className="text-xs text-purple-50 leading-relaxed">Cultural expert from India with deep insights on traditions and daily life.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <p className="font-bold text-blue-300 mb-1">🇰🇷 Mr. Yu</p>
                  <p className="text-xs text-purple-50 leading-relaxed">Korean culture specialist focusing on etiquette and social harmony.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
