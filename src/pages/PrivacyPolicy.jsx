import React from "react";
import Navbar from "../components/Navbar";

const sections = [
  {
    title: "Introduction",
    content:
      "We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you use our platform.",
  },
  {
    title: "Information We Collect",
    content:
      "We may collect information such as your name, email address, contact details, payment-related information, and other details required to provide our services.",
  },
  {
    title: "How We Use Information",
    content:
      "Information collected is used to provide services, manage user accounts, process payment requests, improve platform performance, and communicate important updates.",
  },
  {
    title: "Data Security",
    content:
      "We implement reasonable security measures to protect user data from unauthorized access, disclosure, or misuse.",
  },
  {
    title: "Third-Party Services",
    content:
      "Our platform may utilize third-party payment processors and service providers. Their handling of information is governed by their respective privacy policies.",
  },
  {
    title: "Contact",
    content:
      "For any privacy-related concerns, please contact us through the contact information provided on our website.",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-10">Privacy Policy</h1>

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

export default PrivacyPolicy;