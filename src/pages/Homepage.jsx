import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6">
        <section className="py-24 text-center">
          <span className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
            Fixed amount payment links
          </span>

          <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-6xl">
            Mpoket
            <span className="block text-zinc-400">for your company payments</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Create custom fixed amount service records, track manual payments, and keep the payment-link interface ready for Razorpay integration.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <NavLink
              to="/pay"
              className="rounded-md bg-white px-6 py-3 font-semibold text-black transition hover:bg-zinc-200"
            >
              Generate Link
            </NavLink>

            <NavLink
              to="/about"
              className="rounded-md border border-zinc-800 px-6 py-3 font-semibold text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              About Mpoket
            </NavLink>
          </div>
        </section>

        <section className="grid gap-6 py-12 md:grid-cols-3">
          <Feature title="Custom service records">
            Add product or loan service entries with amount, tenure, customer phone, description, and payment status.
          </Feature>

          <Feature title="Payment history">
            Keep a clean table of paid and unpaid services so your company payment activity is easier to review.
          </Feature>

          <Feature title="Razorpay ready UI">
            The payment-link interface is present, while live Razorpay link generation waits for API credentials.
          </Feature>
        </section>
      </main>

      <footer className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <p className="text-sm text-zinc-500">
            Copyright {new Date().getFullYear()} Mpoket. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <NavLink to="/privacy-policy" className="text-zinc-500 hover:text-white">
              Privacy Policy
            </NavLink>
            <NavLink to="/terms-and-conditions" className="text-zinc-500 hover:text-white">
              Terms
            </NavLink>
            <NavLink to="/contact" className="text-zinc-500 hover:text-white">
              Contact
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Feature = ({ title, children }) => (
  <div className="rounded-md border border-zinc-800 bg-zinc-900/60 p-6">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-3 text-zinc-400">{children}</p>
  </div>
);

export default Homepage;
