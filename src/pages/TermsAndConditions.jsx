import React from "react";
import Navbar from "../components/Navbar";

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing, browsing, or making payments through this website, you agree to be bound by these Terms & Conditions and all applicable laws and regulations.",
  },
  {
    title: "Purpose of the Website",
    content:
      "This website is used to facilitate payments related to products, services, invoices, and other legitimate transactions. Users are responsible for ensuring that payment details entered are accurate before completing a transaction.",
  },
  {
    title: "Payment Transactions",
    content:
      "Payments are processed through authorized third-party payment service providers. Successful completion of a payment does not alter the underlying agreement between the payer and the recipient regarding products, services, or transactions.",
  },
  {
    title: "User Responsibilities",
    content:
      "Users agree to provide accurate information, use the website only for lawful purposes, and refrain from attempting unauthorized access, misuse, or disruption of the website and its services.",
  },
  {
    title: "Refunds and Cancellations",
    content:
      "Refund and cancellation requests are governed by the Refund Policy available on this website. Users are encouraged to review the policy before making payments.",
  },
  {
    title: "Limitation of Liability",
    content:
      "To the maximum extent permitted by law, we shall not be liable for indirect, incidental, special, or consequential damages resulting from the use of this website or third-party payment services.",
  },
  {
    title: "Changes to Terms",
    content:
      "These Terms & Conditions may be updated periodically. Continued use of the website following any modifications constitutes acceptance of the revised terms.",
  },
  {
    title: "Contact Information",
    content:
      "Questions regarding these Terms & Conditions may be directed through the contact information provided on the Contact Us page.",
  },
];

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-10">
          Terms & Conditions
        </h1>

        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.title}
              className="border border-zinc-800 rounded-xl p-6 bg-zinc-900/50"
            >
              <h2 className="text-xl font-semibold mb-3">
                {section.title}
              </h2>

              <p className="text-zinc-400 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;