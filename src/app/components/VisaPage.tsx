import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ShieldCheck,
  Calendar,
  FileText,
  Camera,
  ChevronDown,
  Plus,
  Minus,
  ArrowRight,
  Banknote,
  Plane,
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { add, format } from 'date-fns';

// --- Data Models & Configuration ---

interface FaqItemData {
  q: string;
  a: string;
}

interface VisaData {
  country: string;
  heroImage: string;
  visaType: string;
  entry: string;
  lengthOfStay: string;
  validityPeriod: string;
  fees: number;
  serviceCharges: number;
  processingTimeInDays: number;
  currency: string;
  documents: { icon: React.FC<any>; name: string }[];
  notes: string[];
  faqs: FaqItemData[];
}

const visaDatabase: Record<string, VisaData> = {
  'india-for-korea': {
    country: 'India',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMGluZGlhfGVufDF8fHx8MTc2ODA0MTM3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    visaType: 'e-Tourist Visa',
    entry: 'Double Entry',
    lengthOfStay: '30 days',
    validityPeriod: '1 year',
    fees: 2100,
    serviceCharges: 999,
    processingTimeInDays: 3,
    currency: 'INR',
    documents: [
      { icon: Camera, name: 'Photo' },
      { icon: FileText, name: 'Passport' },
    ],
    notes: ['Passport must be valid for at least 6 months from your date of arrival.'],
    faqs: [
        { q: 'Do Korean citizens need a visa for India?', a: 'Yes, South Korean citizens require an e-visa for tourism purposes to enter India.' },
        { q: 'How long is the Indian e-Tourist visa valid for?', a: 'The 30-day e-Tourist visa is valid for 1 year from the date of grant and allows for two entries.' },
    ],
  },
  'korea-for-india': {
    country: 'South Korea',
    heroImage: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxrb3JlYSUyMHNlb3VsfGVufDF8fHx8MTc2ODEzMjIxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    visaType: 'C-3-9 Tourist Visa',
    entry: 'Single Entry',
    lengthOfStay: 'Up to 90 days',
    validityPeriod: '3 months',
    fees: 3200,
    serviceCharges: 1380,
    processingTimeInDays: 15,
    currency: 'INR',
    documents: [
      { icon: Camera, name: 'Photo' },
      { icon: FileText, name: 'Passport' },
      { icon: Banknote, name: 'Bank Statement' },
      { icon: Plane, name: 'Flight & Hotel' },
    ],
    notes: [
      'Passport must be valid for at least 6 months.',
      'Bank statements for the last 6 months are required.',
    ],
    faqs: [
        { q: 'Do Indian citizens need a visa for South Korea?', a: 'Yes, Indian citizens must obtain a visa prior to entering South Korea for tourism.' },
        { q: 'What is the processing time for a South Korea tourist visa?', a: 'Processing time can take up to 15-20 working days, so it is advisable to apply well in advance.' },
    ],
  },
};

// --- Sub-components ---

const FaqItem = ({ faq, isOpen, onClick }: { faq: FaqItemData, isOpen: boolean, onClick: () => void }) => (
  <div className="border-b">
    <button
      onClick={onClick}
      className="w-full text-left py-4 px-2 flex justify-between items-center hover:bg-gray-50 transition-colors"
      aria-expanded={isOpen}
    >
      <span className="font-semibold text-gray-800">{faq.q}</span>
      <ChevronDown
        className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
          isOpen ? 'transform rotate-180' : ''
        }`}
      />
    </button>
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <p className="text-gray-600 p-4 leading-relaxed">{faq.a}</p>
      </div>
    </div>
  </div>
);

// --- Main Page Component ---

export function VisaPage() {
  const [selectedVisaKey, setSelectedVisaKey] = useState<keyof typeof visaDatabase>('india-for-korea');
  const [travellerCount, setTravellerCount] = useState(1);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const visaData = visaDatabase[selectedVisaKey];

  const totalAmount = (visaData.fees + visaData.serviceCharges) * travellerCount;
  const isCtaDisabled = !departureDate;

  const handleStartApplication = () => {
    if (isCtaDisabled) return;
    console.log('Starting application with:', {
      visaKey: selectedVisaKey,
      travellerCount,
      departureDate,
      totalAmount,
    });
    alert('Redirecting to document upload...');
  };

  const getProcessingDate = () => {
    const now = new Date();
    const processingDate = add(now, { days: visaData.processingTimeInDays });
    return format(processingDate, 'MMM dd, hh:mm a');
  };
  
  useEffect(() => {
    setTravellerCount(1);
    setDepartureDate(null);
  }, [selectedVisaKey]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Apply for a Tourist Visa | IndoKorean</title>
        <meta name="description" content="Apply for tourist visas to India and South Korea. Fast, reliable, and with a 100% on-time guarantee." />
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8 bg-gray-200 p-1 rounded-lg max-w-md mx-auto">
          {Object.keys(visaDatabase).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedVisaKey(key)}
              className={`w-full px-3 py-1.5 text-sm rounded-md font-semibold transition-all duration-300 ${
                selectedVisaKey === key ? 'bg-white shadow' : 'text-gray-600'
              }`}
            >
              {visaDatabase[key].country} Visa
            </button>
          ))}
        </div>

        <div className="text-center md:text-left mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Apply for {visaData.country} Tourist Visa
          </h1>
          <p className="text-gray-600 mt-2">
            Apply now for guaranteed visa. Get On <span className="font-semibold text-green-600">{getProcessingDate()}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <img
              src={visaData.heroImage}
              alt={`${visaData.country} cityscape`}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Documents Required</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {visaData.documents.map(doc => {
                    const Icon = doc.icon;
                    return (
                        <div key={doc.name} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border hover:border-indigo-300 transition-colors">
                            <Icon className="h-8 w-8 text-indigo-600 mb-2" />
                            <span className="font-semibold">{doc.name}</span>
                        </div>
                    )
                })}
              </div>
              {visaData.notes.map(note => (
                <p key={note} className="text-sm text-gray-500 mt-4">
                    <strong>Note:</strong> {note}
                </p>
              ))}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-bold text-blue-800">On Time Guarantee</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Get a 100% refund on our service charges if we don’t deliver your visa on time.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-2">
                {visaData.faqs.map((faq, index) => (
                  <FaqItem
                    key={index}
                    faq={faq}
                    isOpen={openFaqIndex === index}
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md border">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Visa Summary</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex justify-between"><span>Visa Type:</span> <span className="font-semibold">{visaData.visaType}</span></div>
                  <div className="flex justify-between"><span>Entry:</span> <span className="font-semibold">{visaData.entry}</span></div>
                  <div className="flex justify-between"><span>Length of stay:</span> <span className="font-semibold">{visaData.lengthOfStay}</span></div>
                  <div className="flex justify-between"><span>Validity Period:</span> <span className="font-semibold">{visaData.validityPeriod}</span></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md border space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travellers</label>
                  <div className="flex items-center justify-between border rounded-lg p-2">
                    <button onClick={() => setTravellerCount(Math.max(1, travellerCount - 1))} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300" aria-label="Decrease traveller count">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-bold text-lg">{travellerCount}</span>
                    <button onClick={() => setTravellerCount(travellerCount + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300" aria-label="Increase traveller count">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                    <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
                    <DatePicker
                        id="departureDate"
                        selected={departureDate}
                        onChange={(date: Date) => setDepartureDate(date)}
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        className="w-full p-2 border rounded-lg"
                        aria-required="true"
                    />
                </div>

                <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between text-gray-600"><span>Visa Fees:</span> <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: visaData.currency, minimumFractionDigits: 0 }).format(visaData.fees * travellerCount)}</span></div>
                    <div className="flex justify-between text-gray-600"><span>Service Charges:</span> <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: visaData.currency, minimumFractionDigits: 0 }).format(visaData.serviceCharges * travellerCount)}</span></div>
                    <hr className="my-2"/>
                    <div className="flex justify-between text-xl font-bold text-gray-900"><span>Total Amount:</span> <span>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: visaData.currency, minimumFractionDigits: 0 }).format(totalAmount)}</span></div>
                </div>

                <button
                  onClick={handleStartApplication}
                  disabled={isCtaDisabled}
                  className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  Start Application <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
