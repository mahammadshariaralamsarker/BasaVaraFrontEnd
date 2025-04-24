'use client';
import { useState } from 'react';

export default function FaqPage() {
  const faqs = [
    {
      question: 'How do I post a rental property as a landlord?',
      answer:
        "To post a rental property, register as a landlord, go to your dashboard, and click on 'Post Rental House Info'. Fill out the required fields and submit the listing.",
    },
    {
      question: 'How do I request to rent a house?',
      answer:
        "Tenants can search and view listings. Once you find a suitable house, click on 'View Details' and then click the 'Request Rental' button to submit your move-in details.",
    },
    {
      question: 'Do I need to pay to use BasaFinder?',
      answer:
        'Currently, BasaFinder is free for both tenants and landlords. However, certain premium features may be introduced in the future.',
    },
    {
      question: 'How do I contact a landlord?',
      answer:
        "Once a rental request is approved, the landlord's contact details (phone number) will be shared with the tenant through the platform.",
    },
    {
      question: 'Can I edit or delete my house listing?',
      answer:
        "Yes, landlords can edit or delete their listings anytime from their dashboard under 'My Listings'.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="max-w-7xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Frequently Asked{' '}
        <span className="text-teal-500 text-4xl">Questions</span>
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg shadow">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-4 py-3 font-medium bg-gray-100 hover:bg-teal-500 transition rounded-t-lg"
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 text-gray-700 bg-white">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
