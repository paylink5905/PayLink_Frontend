import React from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6">
        <section className="py-24 text-center">
          <span className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
            Secure Payment Collection Platform
          </span>

          <h1 className="mt-8 text-5xl md:text-6xl font-bold tracking-tight">
            Create and Manage
            <span className="block text-zinc-400">
              Payment Links Effortlessly
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-zinc-400">
            A simple and reliable platform for generating payment links,
            tracking transactions, and managing payment collections securely.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <NavLink
              to="/login"
              className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition"
            >
              Get Started
            </NavLink>

            <NavLink
              to="/about"
              className="px-6 py-3 rounded-lg border border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white transition"
            >
              Learn More
            </NavLink>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 py-12">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="text-lg font-semibold">
              Quick Payment Links
            </h3>
            <p className="mt-3 text-zinc-400">
              Generate payment links in seconds and share them with customers
              through any communication channel.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="text-lg font-semibold">
              Secure Transactions
            </h3>
            <p className="mt-3 text-zinc-400">
              Payments are processed through trusted payment infrastructure,
              ensuring reliability and security.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h3 className="text-lg font-semibold">
              Track Collections
            </h3>
            <p className="mt-3 text-zinc-400">
              Monitor payment activity and maintain a complete history of
              generated payment links.
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
            <h2 className="text-3xl font-bold">
              Streamline Your Payment Collection Process
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-zinc-400">
              Simplify payment requests, improve collection efficiency, and
              provide a seamless payment experience for your customers.
            </p>

            <NavLink
              to="/contact"
              className="inline-block mt-8 px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition"
            >
              Contact Us
            </NavLink>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} PayLink. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <NavLink
              to="/privacy-policy"
              className="text-zinc-500 hover:text-white"
            >
              Privacy Policy
            </NavLink>

            <NavLink
              to="/terms-and-conditions"
              className="text-zinc-500 hover:text-white"
            >
              Terms & Conditions
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;