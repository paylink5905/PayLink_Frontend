import Navbar from "../components/Navbar";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Contact</p>
          <h1 className="mt-3 text-4xl font-bold">PayLink support and business contact</h1>
          <p className="mt-4 text-zinc-400">
            This page is available for payment provider review, customer questions, and account support related to fixed amount payment links and manual service records.
          </p>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <ContactCard title="Email" value="support@paylink.local" />
          <ContactCard title="Phone" value="+91 00000 00000" />
          <ContactCard title="Business hours" value="Monday to Saturday, 10 AM to 6 PM" />
        </section>

        <section className="mt-8 rounded-md border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="text-xl font-semibold">Payment and service queries</h2>
          <p className="mt-3 text-zinc-400">
            For any payment link, service entry, refund clarification, transaction history, or account access request, contact the PayLink owner using the details above.
          </p>
        </section>
      </main>
    </div>
  );
};

const ContactCard = ({ title, value }) => (
  <div className="rounded-md border border-zinc-800 bg-zinc-900/60 p-5">
    <p className="text-sm font-medium text-zinc-500">{title}</p>
    <p className="mt-2 font-semibold text-white">{value}</p>
  </div>
);

export default ContactPage;
