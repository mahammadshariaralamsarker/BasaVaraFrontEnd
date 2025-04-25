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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="lg:flex lg:items-center lg:justify-between">
          {/* Testimonials Section */}
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl lg:text-5xl mb-6">
              What Our <span className="text-teal-500">Users Say</span>
            </h2>
            <div className="space-y-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-6 flex items-start"
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={t.image}
                      alt={t.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <p className="italic text-gray-700 mb-2">“{t.quote}”</p>
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Renting Tips Section */}
          <div className="lg:w-1/2 px-5">
            <h2 className="text-3xl font-extrabold text-gray-800 sm:text-4xl lg:text-5xl mb-6">
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
      </div>
    </section>
  );
}