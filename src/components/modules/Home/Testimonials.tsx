import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'Marketing Manager',
      quote:
        'I found my dream apartment within days on BasaFinder. The process was smooth, and the landlord was super responsive!',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Daniel Kim',
      title: 'Graduate Student',
      quote:
        'BasaFinder helped me find a safe and affordable rental close to campus. Highly recommend it to any student!',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
  ];

  const tips = [
    'Always visit the property in person before finalizing the deal.',
    'Read the lease agreement carefully to understand all terms and conditions.',
    'Check for essential amenities like water, electricity, and internet.',
    'Communicate clearly with the landlord about expectations and responsibilities.',
  ];

  return (
    <section className="w-full bg-gray-100 px-6 py-32">
      <div className="w-[90%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Testimonials */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            What Our <span className="text-teal-500">Users Say</span>
          </h2>
          <div className="space-y-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow-md flex items-start gap-4"
              >
                <Image
                  src={t.image}
                  alt={t.name}
                  width={600}
                  height={480}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="italic text-gray-700">“{t.quote}”</p>
                  <p className="mt-2 font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Renting Tips */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Tips for Finding the{' '}
            <span className="text-teal-500">Right Rental</span>
          </h2>
          <ul className="list-disc pl-6 space-y-4 text-gray-700">
            {tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
