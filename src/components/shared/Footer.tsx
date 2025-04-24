import { Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="w-[90%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="flex items-center gap-2 mb-2">
            <Mail size={18} /> support@basafinder.com
          </p>
          <p className="flex items-center gap-2">
            <Phone size={18} /> +1 (800) 123-4567
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Facebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300 transition"
            >
              <Twitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition"
            >
              <Instagram />
            </a>
          </div>
        </div>

        {/* Additional Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/terms" className="hover:underline text-gray-300">
                Terms of Use
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="hover:underline text-gray-300"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:underline text-gray-300">
                FAQs
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BasaFinder. All rights reserved.
      </div>
    </footer>
  );
}
