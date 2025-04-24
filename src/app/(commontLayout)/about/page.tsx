import Image from 'next/image';

const AboutUs = () => {
  const team = [
    {
      name: 'Aisha Patel',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      name: 'James Turner',
      role: 'Lead Developer',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    {
      name: 'Leila Ahmed',
      role: 'Community Manager',
      image: 'https://randomuser.me/api/portraits/women/52.jpg',
    },
  ];

  return (
    <div>
      <section className="w-[90%] mx-auto my-10 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-5">
            About <span className="text-teal-500">Us</span>
          </h2>
          {/* <p className="text-gray-600 text-lg mb-12">
          <span className="font-semibold text-teal-500">BasaFinder</span> is a
          platform that provides a smart, seamless rental housing solution. We
          connect <strong>landlords</strong>, <strong>tenants</strong>, and a
          centralized <strong>admin</strong> to create a reliable and
          transparent rental experience.
        </p> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow hover:shadow-md transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🔑 For Landlords
              </h3>
              <p className="text-gray-600">
                Post, manage, and update rental listings with ease. Approve
                rental requests and securely connect with tenants after
                approval.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow hover:shadow-md transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🏠 For Tenants
              </h3>
              <p className="text-gray-600">
                Search for homes, request rentals, and unlock secure payment
                options after landlord approval. Contact landlords directly for
                details.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-gray-200 shadow hover:shadow-md transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                🛡️ Admin Oversight
              </h3>
              <p className="text-gray-600">
                The admin ensures platform integrity by managing users,
                verifying listings, and resolving disputes — keeping the
                experience safe and fair for everyone.
              </p>
            </div>
          </div>

          <div className="mt-16 mb-32">
            <h4 className="text-2xl font-bold text-gray-800 mb-4">
              Smart. Secure. Simple.
            </h4>
            <p className="text-gray-600 mb-8">
              BasaFinder streamlines the rental journey — from discovery to
              deal. Built with modern tech to deliver trust and convenience at
              every step.
            </p>

            <div>
              <button
                type="submit"
                className="w-60 border border-teal-500 text-teal-500 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-teal-500 hover:text-black"
              >
                Start Browsing Rentals
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 w-full ">
        {/* Team Section */}
        <div className="w-[90%] py-32 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
            Meet Our <span className="text-teal-500">Dynamic Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {team.map((member, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={600}
                  height={480}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
