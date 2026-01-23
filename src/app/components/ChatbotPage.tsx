import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, User, Bot } from 'lucide-react';

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

  const handleQuickQuestion = (question: QuickQuestion) => {
    // Add user's question
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question.question,
      sender: 'user',
      timestamp: new Date(),
    };

    const newMessages = [userMessage];

    // Add response(s) based on selected guide
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

    // Simulated responses
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
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl mb-4">Ask Vivek & Mr. Yu</h1>
          <p className="text-xl text-purple-100 max-w-3xl">
            Get instant answers to your cultural questions from our AI guides representing India and Korea
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Guide Selector */}
              <div className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700">Talk to:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedGuide('both')}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        selectedGuide === 'both'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Both
                    </button>
                    <button
                      onClick={() => setSelectedGuide('vivek')}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        selectedGuide === 'vivek'
                          ? 'bg-orange-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      🇮🇳 Vivek
                    </button>
                    <button
                      onClick={() => setSelectedGuide('mryu')}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        selectedGuide === 'mryu'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      🇰🇷 Mr. Yu
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user'
                          ? 'bg-gray-300'
                          : message.sender === 'vivek'
                          ? 'bg-orange-100'
                          : 'bg-blue-100'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4 text-gray-600" />
                      ) : (
                        <Bot
                          className={`h-4 w-4 ${
                            message.sender === 'vivek' ? 'text-orange-600' : 'text-blue-600'
                          }`}
                        />
                      )}
                    </div>
                    <div
                      className={`flex-1 rounded-lg p-4 ${
                        message.sender === 'user'
                          ? 'bg-indigo-600 text-white'
                          : message.sender === 'vivek'
                          ? 'bg-orange-50 text-gray-900'
                          : 'bg-blue-50 text-gray-900'
                      }`}
                    >
                      {message.sender !== 'user' && (
                        <p className="text-xs mb-1 opacity-75">
                          {message.sender === 'vivek' ? '🇮🇳 Vivek' : '🇰🇷 Mr. Yu'}
                        </p>
                      )}
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 This is a demo chatbot with pre-programmed responses. Real implementation would use n8n for AI-powered answers.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Questions Sidebar */}
          <div>
            <h2 className="text-xl mb-4 text-gray-900">Quick Questions</h2>
            <div className="space-y-3">
              {quickQuestions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(q)}
                  className="w-full text-left bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all hover:border-indigo-300 border border-transparent"
                >
                  <p className="text-sm text-gray-900">{q.question}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="text-sm mb-2 text-gray-900">About Your Guides</h3>
              <div className="space-y-3 text-xs text-gray-700">
                <div>
                  <p className="font-medium text-orange-700">🇮🇳 Vivek</p>
                  <p>Cultural expert from India with insights on traditions, workplace culture, and daily life across different Indian states.</p>
                </div>
                <div>
                  <p className="font-medium text-blue-700">🇰🇷 Mr. Yu</p>
                  <p>Korean culture specialist helping you understand Korean workplace etiquette, social norms, and cultural practices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
