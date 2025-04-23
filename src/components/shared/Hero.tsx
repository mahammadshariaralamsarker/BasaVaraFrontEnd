'use client';
import Image from 'next/image';
import { useState } from 'react';

const rentalHouses = [
  {
    id: 1,
    location: 'New York, NY',
    image: 'https://images.pexels.com/photos/3288102/pexels-photo-3288102.png',
    description: 'Cozy 2-bedroom apartment in downtown.',
    rent: '$2,000/month',
    bedrooms: 2,
  },
  {
    id: 2,
    location: 'Austin, TX',
    image:
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Modern 3-bedroom house with a garden.',
    rent: '$2,500/month',
    bedrooms: 3,
  },
  {
    id: 3,
    location: 'San Francisco, CA',
    image:
      'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Stylish 1-bedroom with a view.',
    rent: '$2,800/month',
    bedrooms: 1,
  },
];

export default function HeroSection() {
  const [search, setSearch] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
  });

  const handleInputChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  return (
    <section className="w-[90%] px-6 py-32 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
          Find Your Perfect{' '}
          <span className="text-teal-500">Rental House Today!</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          BasaFinder connects you to your next rental home—fast, easy, and
          smart.
        </p>
        <a
          href="/post-rental"
          className="inline-block border border-teal-500 text-teal-500 px-5 py-2 rounded-md hover:bg-teal-500 hover:text-black transition duration-200"
        >
          Post Rental House Info
        </a>
      </div>

      {/* Search Form */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-md mb-12">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={search.location}
            onChange={handleInputChange}
            className="p-3 rounded-md border"
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={search.minPrice}
            onChange={handleInputChange}
            className="p-3 rounded-md border"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={search.maxPrice}
            onChange={handleInputChange}
            className="p-3 rounded-md border"
          />
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            value={search.bedrooms}
            onChange={handleInputChange}
            className="p-3 rounded-md border"
          />
        </form>
      </div>

      {/* Rental House Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rentalHouses.map((house) => (
          <div
            key={house.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden"
          >
            <Image
              src={house.image}
              alt="House"
              width={600}
              height={400}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {house.location}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{house.description}</p>
              <div className="mt-3 flex justify-between text-sm text-gray-700">
                <span>{house.rent}</span>
                <span>
                  {house.bedrooms} Bedroom{house.bedrooms > 1 ? 's' : ''}
                </span>
              </div>
              <a
                href={`/rental/${house.id}`}
                className="mt-4 inline-block border border-teal-500 text-teal-500 px-5 py-2 rounded-md hover:bg-teal-500 hover:text-black transition duration-200"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
