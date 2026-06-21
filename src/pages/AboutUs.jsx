import Navbar from "../components/Navbar";

const sections = [
  {
    title: "Single user payment dashboard",
    content:
      "Mpoket is a personal website for one business owner to create and manage custom fixed amount payment links for their company.",
  },
  {
    title: "Service and payment history",
    content:
      "The dashboard stores service records, payment status, customer contact details, amounts, and link history so payment collection stays organized.",
  },
  {
    title: "Manual payments first",
    content:
      "Because Razorpay API access is not available yet, Mpoket currently supports manual service creation and updates while keeping the Razorpay interface ready in the UI.",
  },
  {
    title: "Future payment links",
    content:
      "Once Razorpay credentials are available, the same service records can be extended to generate real payment links and save their history.",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">About Mpoket</p>
        <h1 className="mt-3 text-4xl font-bold">A simple private payment-link manager</h1>
        <p className="mt-4 max-w-3xl text-zinc-400">
          Mpoket keeps company payment requests, fixed amounts, and customer service records in one private dashboard.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title} className="rounded-md border border-zinc-800 bg-zinc-900/60 p-6">
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-3 leading-relaxed text-zinc-400">{section.content}</p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
