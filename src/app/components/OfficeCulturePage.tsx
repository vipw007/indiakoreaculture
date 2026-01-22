import { useState } from 'react';
import { Building2, ChevronDown, ChevronUp } from 'lucide-react';

interface Scenario {
  title: string;
  india: string;
  korea: string;
  safeAction: string;
  category: string;
}

const scenarios: Scenario[] = [
  {
    title: 'Addressing Seniors at Work',
    category: 'Hierarchy & Respect',
    india: 'Use "Sir" or "Ma\'am" for seniors. First names are rarely used unless explicitly permitted. Respect is shown through titles.',
    korea: 'Always use job titles (부장님, 과장님) or add "님" suffix. Never use first names for seniors. Hierarchy is extremely important.',
    safeAction: 'In both cultures: Use formal titles until explicitly told otherwise. When in doubt, err on the side of formality.',
  },
  {
    title: 'Working Late Hours',
    category: 'Work Culture',
    india: 'Depends on company culture. IT companies may have flexible hours. Traditional offices expect 9-6. Overtime is common but not always expected.',
    korea: 'Leaving before your boss is often frowned upon. Long working hours are common. Evening work culture (회식 - hweh-sik) is part of bonding.',
    safeAction: 'Observe your team\'s patterns for the first month. Show dedication but maintain work-life balance. Communicate your commitments clearly.',
  },
  {
    title: 'Saying "No" to Your Manager',
    category: 'Communication',
    india: 'Direct "no" is acceptable if explained properly. You can negotiate deadlines or resources. Communication can be more direct in urban offices.',
    korea: 'Direct "no" is considered rude. Use phrases like "It might be difficult" or "I need to check." Suggest alternatives instead of refusing.',
    safeAction: 'Never flatly refuse. Always provide context: "I\'d like to help, but I have X deadline. Can we discuss priorities?" or "This might take longer than expected. May I propose an alternative timeline?"',
  },
  {
    title: 'Email and Messaging Etiquette',
    category: 'Communication',
    india: 'Email for formal communication. WhatsApp/Slack common for quick updates. Response within 24 hours expected. More casual in tone.',
    korea: 'Email for formal requests. KakaoTalk for instant communication. Expected to respond quickly, even after hours. Very formal language structure.',
    safeAction: 'Use email for important requests with clear subject lines. Keep messages professional. Respond to urgent messages within hours. Learn basic formal phrases in local language.',
  },
  {
    title: 'Team Meetings Participation',
    category: 'Meeting Behavior',
    india: 'Active participation is valued. Interrupting with ideas is often accepted. Meetings can be dynamic and discussion-heavy.',
    korea: 'Listen more than speak, especially as a junior. Wait for your turn. Don\'t contradict seniors publicly. Meetings follow strict hierarchy.',
    safeAction: 'Take notes actively. When you have input, phrase it as: "May I share a thought?" or "Would it be helpful if I...?" Save debates for smaller group discussions or private conversations.',
  },
  {
    title: 'Lunch and Coffee Breaks',
    category: 'Work Culture',
    india: 'Lunch breaks are social time. Team lunches are common. Coffee breaks are casual. People often eat at their desks.',
    korea: 'Lunch with colleagues is almost mandatory for bonding. Coffee breaks are frequent. Eating alone might seem anti-social.',
    safeAction: 'Join team lunches especially in the first months. Offer to grab coffee for seniors occasionally. If you need alone time, occasionally say you have an errand.',
  },
  {
    title: 'Giving Feedback to Colleagues',
    category: 'Communication',
    india: 'Can be direct but polite. Feedback in group settings is okay if constructive. One-on-one is preferred for critical feedback.',
    korea: 'Never criticize in public. Indirect language is crucial. Feedback should go through hierarchy. Face-saving is extremely important.',
    safeAction: 'Always give feedback privately. Start with positives. Use phrases like: "I noticed..." or "Perhaps we could try..." Never make someone lose face publicly.',
  },
  {
    title: 'Dress Code and Appearance',
    category: 'Professional Norms',
    india: 'Business casual in most IT companies. Formal wear for client meetings. Traditional wear is acceptable and appreciated.',
    korea: 'Conservative formal wear is standard. Suits for men, formal dresses/suits for women. Appearance is taken very seriously.',
    safeAction: 'Observe for the first week. When in doubt, dress more formally. Keep appearance neat and professional. Invest in quality business attire.',
  },
  {
    title: 'Using Office Resources',
    category: 'Professional Norms',
    india: 'Generally flexible. Personal calls at desk are usually okay if brief. Internet usage monitored but not strictly in most places.',
    korea: 'Very strict boundaries. Personal activities during work hours frowned upon. Efficiency and dedication are constantly observed.',
    safeAction: 'Keep personal activities minimal during work hours. Use breaks for personal matters. Don\'t use company resources for personal work without permission.',
  },
  {
    title: 'Age and Seniority',
    category: 'Hierarchy & Respect',
    india: 'Respect for elders exists but merit-based hierarchy is also strong. Younger managers are increasingly common and accepted.',
    korea: 'Age hierarchy is paramount. Even one year of age difference matters. Younger person always shows deference to older, regardless of position.',
    safeAction: 'Show respect to both age and position. If you\'re younger, be extra courteous. If you\'re older but junior in position, navigate carefully by showing respect to the role.',
  },
  {
    title: 'Expressing Disagreement',
    category: 'Communication',
    india: 'Respectful disagreement is generally accepted. Can present alternative views if backed by data. Debate culture exists in some companies.',
    korea: 'Disagreeing with seniors requires extreme tact. Use phrases like "I may not fully understand, but..." or suggest as a question rather than statement.',
    safeAction: 'Frame disagreements as questions: "Have we considered...?" or "What if we also looked at...?" Present alternatives as additions, not contradictions.',
  },
  {
    title: 'Work-Life Balance Expectations',
    category: 'Work Culture',
    india: 'Improving in modern companies. Flexibility for personal emergencies. Festival leaves are important. Family obligations are generally respected.',
    korea: 'Work often comes first. Personal commitments may need to be secondary. Dedication to company is valued highly. Leaving early repeatedly is noticed.',
    safeAction: 'Plan personal commitments around work. Communicate important personal events well in advance. Show dedication but also set boundaries respectfully when needed.',
  },
];

const categories = Array.from(new Set(scenarios.map(s => s.category)));

export function OfficeCulturePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);

  const filteredScenarios = selectedCategory
    ? scenarios.filter(s => s.category === selectedCategory)
    : scenarios;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-10 w-10" />
            <h1 className="text-4xl md:text-5xl">Office & Professional Culture</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl">
            Navigate workplace differences between India and Korea with practical scenarios, 
            explanations, and safe actions for every situation
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg mb-2 text-gray-900 flex items-center gap-2">
            <span>💼</span>
            Understanding Workplace Culture
          </h3>
          <p className="text-gray-700 mb-3">
            This guide helps you understand key differences in workplace culture between India and Korea. 
            Each scenario provides context for both cultures and suggests safe actions that work in both environments.
          </p>
          <p className="text-sm text-gray-600">
            <strong>Format:</strong> Scenario → Explanation (India vs Korea) → Safe Action
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-xl mb-4 text-gray-900">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === null
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Scenarios
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Scenarios */}
        <div className="space-y-4">
          {filteredScenarios.map((scenario) => (
            <div
              key={scenario.title}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedScenario(
                    expandedScenario === scenario.title ? null : scenario.title
                  )
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="text-left">
                  <h3 className="text-lg text-gray-900 mb-1">{scenario.title}</h3>
                  <span className="text-sm text-indigo-600">{scenario.category}</span>
                </div>
                {expandedScenario === scenario.title ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>

              {expandedScenario === scenario.title && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="grid md:grid-cols-2 gap-6 mt-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🇮🇳</span>
                        <h4 className="text-base text-gray-900">India</h4>
                      </div>
                      <p className="text-gray-700 bg-orange-50 p-4 rounded-lg">
                        {scenario.india}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🇰🇷</span>
                        <h4 className="text-base text-gray-900">Korea</h4>
                      </div>
                      <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">
                        {scenario.korea}
                      </p>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-base text-gray-900 mb-2 flex items-center gap-2">
                      <span>✅</span>
                      Safe Action (Works in Both Cultures)
                    </h4>
                    <p className="text-gray-700">{scenario.safeAction}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Tips */}
        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg mb-3 text-gray-900">🌟 General Tips for Success</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Observe First:</strong> Spend your first month watching how others behave</li>
            <li>• <strong>Ask Questions:</strong> It's better to ask than to make cultural mistakes</li>
            <li>• <strong>Show Respect:</strong> When in doubt, be more formal and respectful</li>
            <li>• <strong>Learn Basic Phrases:</strong> Knowing greetings in local language goes a long way</li>
            <li>• <strong>Be Patient:</strong> Cultural adaptation takes time - be kind to yourself</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
