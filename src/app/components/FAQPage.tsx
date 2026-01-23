import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FAQPage() {
  const faqs = [
    {
      question: "What is the India-Korea Cultural Bridge?",
      answer: "It is a platform designed to foster understanding and connection between Indian and Korean cultures through tourism guides, workplace culture insights, and community interaction."
    },
    {
      question: "Is the content free to access?",
      answer: "Yes, most of our cultural guides and community features are free to access. Some premium features or specialized consultations may have associated costs."
    },
    {
      question: "How can I contribute to the community?",
      answer: "You can join our community rooms, participate in discussions, share your experiences, and connect with other members interested in Indo-Korean culture."
    },
    {
      question: "Are the travel guides updated regularly?",
      answer: "Yes, we strive to keep our travel guides for both India and Korea up to date with the latest information on places, food, and cultural norms."
    },
    {
      question: "Can I get language learning support here?",
      answer: "We provide basic phrases and cultural context. For in-depth language learning, we can recommend partner resources, but our focus is on cultural exchange and practical communication."
    }
  ];

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Frequently Asked Questions | IndoKorean</title>
        <meta name="description" content="Find answers to common questions about IndoKorean, our cultural guides, community features, and services bridging India and Korea." />
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our platform and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
