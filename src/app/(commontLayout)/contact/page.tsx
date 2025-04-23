import Image from 'next/image';

const ContactUsPage = () => {
  return (
    <div className="w-[90%] mx-auto flex justify-center px-4 py-10">
      <div className="flex flex-col md:flex-row w-full max-w-7xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Form - One Third */}
        <div className="w-full md:w-1/3 p-8 pt-0">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            Contact <span className="text-teal-500">Us</span>
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium">Name</label>
              <input
                type="text"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Phone</label>
              <input
                type="tel"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="+1 234 567 8900"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Message</label>
              <textarea
                rows="4"
                className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full border border-teal-500 text-teal-500 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-teal-500 hover:text-black"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Image - Two Thirds */}
        <div className="w-full md:w-2/3">
          <Image
            src="https://pixabay.com/get/g19780ea5ca436bb04a30247819478dff194533e93ed0052090245134dfa64e01e04db1cc88b0a8f20621b1dcd66946c4b18ce99d21063c72fee939c2f25ac9beeff450979d4a4868e96060e5b91bb295_640.jpg"
            alt="Contact Us"
            width={640}
            height={480}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
