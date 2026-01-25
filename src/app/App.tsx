import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Header } from './components/Header'
import { ScrollToTop } from './components/scrollTop'
import { AuthProvider } from './context/AuthContext'

import { HomePage } from './components/HomePage'
import { TourismPage } from './components/TourismPage'
import { StateDetailPage } from './components/StateDetailPage'
import { OfficeCulturePage } from './components/OfficeCulturePage'
import { ChatbotPage } from './components/ChatbotPage'
import { CommunityPage } from './components/CommunityPage'
import { LoginPage } from './components/LoginPage'
import { ContactPage } from './components/ContactPage'
import { FAQPage } from './components/FAQPage'
import { AdminBlogEditor } from './components/AdminBlogEditor'
import { RoomPage } from './components/RoomPage'
import { PrivateChatPage } from './components/PrivateChatPage'
import { GroupChatPage } from './components/GroupChatPage'
import { VisaPage } from './components/VisaPage'
import { FoodPage } from './components/FoodPage'

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/tourism" element={<TourismPage />} />
              <Route path="/tourism/:region/:stateId" element={<StateDetailPage />} />
              <Route path="/office-culture" element={<OfficeCulturePage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/community/room/:roomId" element={<RoomPage />} />
              <Route path="/private-chat/:privateChatId" element={<PrivateChatPage />} />
              <Route path="/group-chat/:chatId" element={<GroupChatPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/admin/blog/:region/:stateId" element={<AdminBlogEditor />} />
              <Route path="/visa" element={<VisaPage />} />
              <Route path="/food" element={<FoodPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  )
}
