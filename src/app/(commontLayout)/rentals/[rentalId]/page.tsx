'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function RentalHouseDetails() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    moveInDate: '',
    duration: '',
    message: '',
  });

  const house = {
    title: 'Elegant 2 Bedroom Apartment',
    location: 'Dhanmondi, Dhaka',
    rent: 22000,
    bedrooms: 2,
    description:
      'This elegant apartment offers a cozy, modern interior with plenty of natural light. Located in a peaceful neighborhood with access to shopping malls, schools, and public transport.',
    amenities: [
      'WiFi',
      'Furnished',
      '24/7 Security',
      'Air Conditioning',
      'Elevator',
      'Generator Backup',
    ],
    address: 'House #10, Road #4A, Dhanmondi, Dhaka',
    images: [
      'https://images.unsplash.com/photo-1679105796480-13346b5832c9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1625334782252-da92af3ad887?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1635108195644-a3c57f263186?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1635108197421-254328ae9f3c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  };

  const handleChange = (e: { target: { name: string; value: string; }; }) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Rental Request Submitted:', form);
    setShowModal(false);
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-10 text-gray-800">
      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {house.images.map((img, i) => (
          <Image
            key={i}
            src={img}
            width={600}
            height={400}
            alt={`house-${i}`}
            className="w-full h-64 object-cover rounded-lg shadow"
          />
        ))}
      </div>

      {/* Details */}
      <h1 className="text-3xl font-bold mb-2">{house.title}</h1>
      <p className="text-lg text-gray-600 mb-4">{house.location}</p>

      <div className="text-lg mb-4">
        <strong>Rent:</strong> ৳{house.rent} / month
      </div>
      <div className="text-lg mb-4">
        <strong>Bedrooms:</strong> {house.bedrooms}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-xl mb-2">Description</h3>
        <p>{house.description}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-xl mb-2">Amenities</h3>
        <ul className="list-disc pl-6 text-gray-700">
          {house.amenities.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Exact Location</h3>
        <p>{house.address}</p>
      </div>

      {/* Request Rental Button */}
      <button
        onClick={() => setShowModal(true)}
        className="border border-teal-500 text-teal-500 px-5 py-2 rounded-md hover:bg-teal-500 hover:text-black transition duration-200"
      >
        Request Rental
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Rental Request</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Move-in Date
                </label>
                <input
                  type="date"
                  name="moveInDate"
                  value={form.moveInDate}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Rental Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  placeholder="e.g., 6 months"
                  value={form.duration}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Special Requirements
                </label>
                <textarea
                  name="message"
                  placeholder="Let the landlord know anything important..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded mt-1"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border border-teal-500 text-teal-500 px-5 py-2 rounded-md hover:bg-teal-500 hover:text-black transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="border border-teal-500 text-teal-500 px-5 py-2 rounded-md hover:bg-teal-500 hover:text-black transition duration-200"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
