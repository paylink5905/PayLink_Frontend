import React from "react";
import Navbar from "../components/Navbar";

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using this platform, you agree to comply with and be bound by these Terms & Conditions.",
  },
  {
    title: "Use of Services",
    content:
      "Users agree to use the platform only for lawful purposes and in accordance with applicable laws and regulations.",
  },
  {
    title: "User Responsibilities",
    content:
      "Users are responsible for maintaining the confidentiality of their account information and for all activities conducted under their account.",
  },
  {
    title: "Payments",
    content:
      "Payment transactions may be processed through third-party payment service providers. We do not guarantee uninterrupted availability of external payment services.",
  },
  {
    title: "Limitation of Liability",
    content:
      "We shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.",
  },
  {
    title: "Modifications",
    content:
      "We reserve the right to modify these Terms & Conditions at any time. Continued use of the platform constitutes acceptance of the updated terms.",
  },
  {
    title: "Contact Information",
    content:
      "Questions regarding these Terms & Conditions may be directed to us through the contact details available on the website.",
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