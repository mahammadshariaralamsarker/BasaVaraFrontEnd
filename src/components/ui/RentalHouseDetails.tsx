import Image from 'next/image';
import { useState } from 'react';

export default function RentalHouseDetails({ house }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    moveInDate: '',
    duration: '',
    message: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Rental Request Submitted:', form);
    setShowModal(false);
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-10 text-gray-800">
      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {house.images.map((img, i) => (
          <Image
            width={600}
            height={480}
            key={i}
            src={img}
            alt={`house-${i}`}
            className="w-full h-64 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Details */}
      <h1 className="text-3xl font-bold mb-2">{house.title}</h1>
      <p className="text-lg text-gray-600 mb-4">{house.location}</p>

      <div className="text-lg mb-4">
        <strong>Rent:</strong> ${house.rent} / month
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
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
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
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
