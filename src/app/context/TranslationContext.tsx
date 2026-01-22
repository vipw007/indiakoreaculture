import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ko';

interface TranslationContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        // Header
        'nav.home': 'Home',
        'nav.tourism': 'Tourism & Culture',
        'nav.office': 'Office Culture',
        'nav.chatbot': 'Ask Vivek & Mr. Yu',
        'nav.community': 'Community',

        // Home Page
        'home.title': 'India ⇄ Korea Cultural Bridge',
        'home.subtitle': 'Your trusted platform for cultural exchange, workplace guidance, and authentic connections between India and Korea',
        'home.exploreCulture': 'Explore Culture',
        'home.askQuestions': 'Ask Questions',
        'home.features': 'Explore Our Features',
        'home.featuresSubtitle': 'Building trust through knowledge and authentic connections',
        'home.learnMore': 'Learn more',
        'home.whyTrust': 'Why Trust Us?',
        'home.comprehensive': 'Comprehensive',
        'home.comprehensiveDesc': 'Detailed guides covering all aspects of cultural exchange',
        'home.safe': 'Safe & Moderated',
        'home.safeDesc': 'Verified profiles and moderated community interactions',
        'home.authentic': 'Authentic',
        'home.authenticDesc': 'Real insights from cultural experts and community members',

        // Tourism Page
        'tourism.title': 'Tourism & Culture',
        'tourism.subtitle': 'Explore 10 priority Indian states with comprehensive guides on places to visit, local food, cultural norms, and essential do\'s and don\'ts',
        'tourism.priorityStates': 'Priority States',
        'tourism.clickState': 'Click on any state to explore detailed information',
        'tourism.exploreDetails': 'Explore details',
        'tourism.whyStates': 'Why These States?',
        'tourism.whyStatesDesc': 'These 10 states represent diverse cultures, languages, cuisines, and traditions across India. They\'re the most visited by tourists and offer a comprehensive introduction to Indian culture, making them perfect for first-time visitors and those curious about India\'s rich heritage.',
        'tourism.members': 'members',

        // State Detail Page
        'state.backToStates': 'Back to states',
        'state.placesToVisit': 'Places to Visit',
        'state.localFood': 'Local Food',
        'state.culturalNorms': 'Cultural Norms',
        'state.greetings': 'Greetings',
        'state.traditionalClothing': 'Traditional Clothing',
        'state.dos': 'Do\'s',
        'state.donts': 'Don\'ts',
        'state.veg': 'Veg',
        'state.nonVeg': 'Non-veg',

        // Office Culture Page
        'office.title': 'Office & Professional Culture',
        'office.subtitle': 'Navigate workplace differences between India and Korea with practical scenarios, explanations, and safe actions for every situation',
        'office.understanding': 'Understanding Workplace Culture',
        'office.understandingDesc': 'This guide helps you understand key differences in workplace culture between India and Korea. Each scenario provides context for both cultures and suggests safe actions that work in both environments.',
        'office.format': 'Format: Scenario → Explanation (India vs Korea) → Safe Action',
        'office.filterByCategory': 'Filter by Category',
        'office.allScenarios': 'All Scenarios',
        'office.india': 'India',
        'office.korea': 'Korea',
        'office.safeAction': 'Safe Action (Works in Both Cultures)',
        'office.generalTips': 'General Tips for Success',

        // Chatbot Page
        'chatbot.title': 'Ask Vivek & Mr. Yu',
        'chatbot.subtitle': 'Get instant answers to your cultural questions from our AI guides representing India and Korea',
        'chatbot.talkTo': 'Talk to:',
        'chatbot.both': 'Both',
        'chatbot.typeQuestion': 'Type your question...',
        'chatbot.send': 'Send',
        'chatbot.demoNotice': 'This is a demo chatbot with pre-programmed responses. Real implementation would use n8n for AI-powered answers.',
        'chatbot.quickQuestions': 'Quick Questions',
        'chatbot.aboutGuides': 'About Your Guides',
        'chatbot.vivekDesc': 'Cultural expert from India with insights on traditions, workplace culture, and daily life across different Indian states.',
        'chatbot.mryuDesc': 'Korean culture specialist helping you understand Korean workplace etiquette, social norms, and cultural practices.',

        // Community Page
        'community.title': 'Community Connection',
        'community.subtitle': 'Join topic-based rooms for authentic cultural exchange, Q&A sessions, and scheduled audio conversations - all moderated for safety',
        'community.safeModerated': 'Safe & Moderated Community',
        'community.verifiedProfiles': 'All users have verified profiles',
        'community.activeModeration': 'Active moderation and clear conduct guidelines',
        'community.reportBlock': 'Report and block features available',
        'community.noDating': 'No dating-first positioning - focused on cultural exchange',
        'community.privacyProtection': 'Privacy protection - no PII collection',
        'community.browseByTopic': 'Browse by Topic',
        'community.allRooms': 'All Rooms',
        'community.officeLife': 'Office Life',
        'community.travelHelp': 'Travel Help',
        'community.cultureQuestions': 'Culture Questions',
        'community.topicRooms': 'Topic-Based Rooms',
        'community.upcomingSessions': 'Upcoming Sessions',
        'community.joinRoom': 'Join Room',
        'community.register': 'Register',
        'community.guidelines': 'Community Guidelines',
        'community.activeNow': 'active now',
        'community.joined': 'joined',
        'community.max': 'max',
    },
    ko: {
        // Header
        'nav.home': '홈',
        'nav.tourism': '관광 & 문화',
        'nav.office': '직장 문화',
        'nav.chatbot': 'Vivek & Mr. Yu에게 물어보기',
        'nav.community': '커뮤니티',

        // Home Page
        'home.title': '인도 ⇄ 한국 문화 교류',
        'home.subtitle': '인도와 한국 간 문화 교류, 직장 안내 및 진정한 연결을 위한 신뢰할 수 있는 플랫폼',
        'home.exploreCulture': '문화 탐험',
        'home.askQuestions': '질문하기',
        'home.features': '기능 살펴보기',
        'home.featuresSubtitle': '지식과 진정한 연결을 통한 신뢰 구축',
        'home.learnMore': '더 알아보기',
        'home.whyTrust': '왜 신뢰해야 하나요?',
        'home.comprehensive': '포괄적',
        'home.comprehensiveDesc': '문화 교류의 모든 측면을 다루는 자세한 가이드',
        'home.safe': '안전 & 관리됨',
        'home.safeDesc': '검증된 프로필 및 관리되는 커뮤니티 상호작용',
        'home.authentic': '진정성',
        'home.authenticDesc': '문화 전문가 및 커뮤니티 회원의 실제 통찰력',

        // Tourism Page
        'tourism.title': '관광 & 문화',
        'tourism.subtitle': '방문할 장소, 현지 음식, 문화적 규범 및 필수 사항에 대한 포괄적인 가이드로 인도의 10개 주요 주를 탐험하세요',
        'tourism.priorityStates': '주요 주',
        'tourism.clickState': '자세한 정보를 탐색하려면 주를 클릭하세요',
        'tourism.exploreDetails': '자세히 보기',
        'tourism.whyStates': '왜 이 주들인가요?',
        'tourism.whyStatesDesc': '이 10개 주는 인도 전역의 다양한 문화, 언어, 요리 및 전통을 대표합니다. 관광객들이 가장 많이 방문하며 인도 문화에 대한 포괄적인 소개를 제공하므로 처음 방문하는 분들과 인도의 풍부한 유산에 관심 있는 분들에게 완벽합니다.',
        'tourism.members': '명의 회원',

        // State Detail Page
        'state.backToStates': '주 목록으로 돌아가기',
        'state.placesToVisit': '방문할 장소',
        'state.localFood': '현지 음식',
        'state.culturalNorms': '문화적 규범',
        'state.greetings': '인사',
        'state.traditionalClothing': '전통 의상',
        'state.dos': '해야 할 것',
        'state.donts': '하지 말아야 할 것',
        'state.veg': '채식',
        'state.nonVeg': '비채식',

        // Office Culture Page
        'office.title': '직장 및 전문 문화',
        'office.subtitle': '실용적인 시나리오, 설명 및 모든 상황에 대한 안전한 조치로 인도와 한국 간의 직장 차이점을 탐색하세요',
        'office.understanding': '직장 문화 이해하기',
        'office.understandingDesc': '이 가이드는 인도와 한국의 직장 문화의 주요 차이점을 이해하는 데 도움이 됩니다. 각 시나리오는 두 문화에 대한 맥락을 제공하고 두 환경에서 모두 작동하는 안전한 조치를 제안합니다.',
        'office.format': '형식: 시나리오 → 설명 (인도 vs 한국) → 안전한 조치',
        'office.filterByCategory': '카테고리별 필터',
        'office.allScenarios': '모든 시나리오',
        'office.india': '인도',
        'office.korea': '한국',
        'office.safeAction': '안전한 조치 (두 문화 모두에서 작동)',
        'office.generalTips': '성공을 위한 일반 팁',

        // Chatbot Page
        'chatbot.title': 'Vivek & Mr. Yu에게 물어보기',
        'chatbot.subtitle': '인도와 한국을 대표하는 AI 가이드로부터 문화 질문에 대한 즉각적인 답변을 받으세요',
        'chatbot.talkTo': '대화 상대:',
        'chatbot.both': '둘 다',
        'chatbot.typeQuestion': '질문을 입력하세요...',
        'chatbot.send': '보내기',
        'chatbot.demoNotice': '이것은 미리 프로그래밍된 응답이 있는 데모 챗봇입니다. 실제 구현에서는 AI 기반 답변을 위해 n8n을 사용합니다.',
        'chatbot.quickQuestions': '빠른 질문',
        'chatbot.aboutGuides': '가이드 소개',
        'chatbot.vivekDesc': '인도의 전통, 직장 문화 및 다양한 인도 주의 일상 생활에 대한 통찰력을 가진 인도 문화 전문가.',
        'chatbot.mryuDesc': '한국 직장 예절, 사회적 규범 및 문화적 관습을 이해하는 데 도움을 주는 한국 문화 전문가.',

        // Community Page
        'community.title': '커뮤니티 연결',
        'community.subtitle': '진정한 문화 교류, Q&A 세션 및 예정된 오디오 대화를 위한 주제별 방에 참여하세요 - 모두 안전하게 관리됩니다',
        'community.safeModerated': '안전하고 관리되는 커뮤니티',
        'community.verifiedProfiles': '모든 사용자는 검증된 프로필을 가지고 있습니다',
        'community.activeModeration': '적극적인 관리 및 명확한 행동 지침',
        'community.reportBlock': '신고 및 차단 기능 사용 가능',
        'community.noDating': '데이트 우선 포지셔닝 없음 - 문화 교류에 집중',
        'community.privacyProtection': '개인정보 보호 - PII 수집 없음',
        'community.browseByTopic': '주제별 탐색',
        'community.allRooms': '모든 방',
        'community.officeLife': '직장 생활',
        'community.travelHelp': '여행 도움',
        'community.cultureQuestions': '문화 질문',
        'community.topicRooms': '주제별 방',
        'community.upcomingSessions': '예정된 세션',
        'community.joinRoom': '방 참여',
        'community.register': '등록',
        'community.guidelines': '커뮤니티 가이드라인',
        'community.activeNow': '현재 활동 중',
        'community.joined': '참여',
        'community.max': '최대',
    },
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ko' : 'en');
    };

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations.en] || key;
    };

    return (
        <TranslationContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </TranslationContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
}
