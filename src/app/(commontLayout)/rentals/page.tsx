import Image from 'next/image';

const rentalHouses = [
  {
    id: 1,
    title: '2BHK in Green Valley',
    location: 'Kathmandu, Nepal',
    rent: 'Rs. 25,000/month',
    bedrooms: 2,
    description: 'Modern apartment with balcony and parking.',
    image:
      'https://demo18.houzez.co/wp-content/uploads/2020/09/house-model-4.jpg',
  },
  {
    id: 2,
    title: 'Spacious Studio in Thamel',
    location: 'Kathmandu, Nepal',
    rent: 'Rs. 18,000/month',
    bedrooms: 1,
    description: 'Compact and cozy studio near tourist area.',
    image:
      'https://demo05.houzez.co/wp-content/uploads/2016/03/los-angeles-11.jpg',
  },
  {
    id: 3,
    title: 'Family Home in Lalitpur',
    location: 'Lalitpur, Nepal',
    rent: 'Rs. 30,000/month',
    bedrooms: 3,
    description: 'Perfect for families. Garden and ample parking.',
    image:
      'https://plus.unsplash.com/premium_photo-1661659914512-83f8091f0d22?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function AllRentalHousesPage() {
  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        All Listed Rental Houses
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rentalHouses.map((house) => (
          <div
            key={house.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition"
          >
            <Image
              src={house.image}
              alt={house.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{house.title}</h2>
              <p className="text-gray-600 text-sm">{house.location}</p>
              <p className="text-sm mt-1 text-gray-700">{house.description}</p>
              <div className="mt-3 text-sm">
                <span className="block font-medium">Rent: {house.rent}</span>
                <span>Bedrooms: {house.bedrooms}</span>
              </div>
              <button className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
