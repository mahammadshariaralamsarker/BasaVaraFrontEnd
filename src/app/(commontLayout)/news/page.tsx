'use client';

import Image from 'next/image';

const newsItems = [
  {
    id: 1,
    title: 'BasaFinder Launches New Messaging Feature',
    date: 'April 20, 2025',
    summary:
      'We’ve introduced in-app messaging to make communication between landlords and tenants easier, faster, and safer.',
    image:
      'https://images.unsplash.com/photo-1641910532059-ad684fd3049c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Top 5 Rental Trends in 2025',
    date: 'April 10, 2025',
    summary:
      'Explore this year’s rental market trends and how they’re reshaping tenant expectations across urban areas.',
    image:
      'https://images.unsplash.com/photo-1635108198161-398232ecdcb8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'BasaFinder Expands to New Cities',
    date: 'March 28, 2025',
    summary:
      'We’re excited to announce our platform is now available in over 10 additional cities!',
    image:
      'https://images.unsplash.com/photo-1635108197511-8e6046f191f3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function NewsPage() {
  return (
    <section className="max-w-7 mx-auto p-6 text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Latest <span className="text-teal-500">News</span>
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden transition hover:shadow-xl"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={600}
              height={480}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-500">{item.date}</p>
              <h2 className="font-semibold text-lg mt-1">{item.title}</h2>
              <p className="mt-2 text-gray-600">{item.summary}</p>
              <button className="mt-4 inline-block text-blue-600 hover:underline text-sm">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
