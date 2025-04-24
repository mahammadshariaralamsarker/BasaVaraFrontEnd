export default function PrivacyPolicyPage() {
  return (
    <section className="max-w-7xl mx-auto p-6 text-gray-800 mb-16">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Privacy <span className="text-teal-500">Policy</span>
      </h1>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed">
        <div>
          <h2 className="font-semibold text-lg mb-2">1. Introduction</h2>
          <p>
            This Privacy Policy explains how BasaFinder collects, uses, and
            protects your personal information when you use our platform. By
            accessing BasaFinder, you agree to the practices described in this
            policy.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">
            2. Information We Collect
          </h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Personal information such as name, email, and phone number</li>
            <li>Property listings and rental preferences</li>
            <li>Usage data such as search history and interactions</li>
            <li>
              Payment-related details (securely handled via third-party
              services)
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">
            3. How We Use Your Information
          </h2>
          <p>We use the information to:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Provide and manage our services</li>
            <li>Match tenants with suitable properties</li>
            <li>Improve user experience</li>
            <li>Send notifications and updates</li>
            <li>Ensure compliance with our Terms of Use</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">4. Information Sharing</h2>
          <p>
            We do not sell or rent your personal data. We may share information
            with trusted service providers who help us operate the platform
            (e.g., hosting, payments), or when legally required.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your data from unauthorized access, loss, or misuse.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Access and update your personal information</li>
            <li>Request deletion of your account</li>
            <li>Withdraw consent for data processing</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">7. Cookies</h2>
          <p>
            We use cookies to improve functionality and analyze usage patterns.
            You can manage cookies through your browser settings.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">
            8. Updates to this Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We encourage
            you to review this page periodically for any changes.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-2">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at: <strong>privacy@basafinder.com</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
