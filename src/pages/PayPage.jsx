import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import DashboardSidebar from "../components/DashboardSidebar";
import usePaymentLinkStore from "../store/usePaymentLinkStore";

const emptyForm = {
  name: "",
  description: "",
  amount: "",
  tenure_months: "",
  phone: "",
  type: "ONE_TIME",
  status: "UNPAID",
};

const PayPage = () => {
  const { createPaymentLink, generatedPaymentLink, loading, error } = usePaymentLinkStore();
  const [form, setForm] = useState(emptyForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "type" && value === "ONE_TIME" ? { tenure_months: "" } : {}),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      amount: Number(form.amount),
      tenure_months: form.type === "LOAN" ? Number(form.tenure_months) : null,
    };

    const result = await createPaymentLink(payload);
    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Payment link generated");
  };

  const fullLink = generatedPaymentLink
    ? `${window.location.origin}${generatedPaymentLink.payment_link}`
    : "";

  const copyGeneratedLink = async () => {
    await navigator.clipboard.writeText(fullLink);
    toast.success("Payment link copied");
  };

  return (
    <div className="flex min-h-screen bg-zinc-100">
      <DashboardSidebar />

      <main className="min-w-0 flex-1">
        <header className="border-b border-zinc-200 bg-white px-5 py-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Create link</p>
          <h1 className="mt-1 text-2xl font-bold text-zinc-950">Generate fixed amount payment link</h1>
        </header>

        <div className="grid gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-8">
          <section className="rounded-md border border-zinc-200 bg-white p-5">
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
              <Field label="Payment type" className="md:col-span-2">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className={`cursor-pointer rounded-md border p-4 transition ${form.type === "ONE_TIME" ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"}`}>
                    <input
                      type="radio"
                      name="type"
                      value="ONE_TIME"
                      checked={form.type === "ONE_TIME"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="font-semibold">One-time payment</span>
                    <span className={`mt-1 block text-sm ${form.type === "ONE_TIME" ? "text-zinc-300" : "text-zinc-500"}`}>
                      For a fixed product, service, invoice, or single collection.
                    </span>
                  </label>

                  <label className={`cursor-pointer rounded-md border p-4 transition ${form.type === "LOAN" ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"}`}>
                    <input
                      type="radio"
                      name="type"
                      value="LOAN"
                      checked={form.type === "LOAN"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="font-semibold">Loan payment</span>
                    <span className={`mt-1 block text-sm ${form.type === "LOAN" ? "text-zinc-300" : "text-zinc-500"}`}>
                      For repayments where tenure in months should be stored.
                    </span>
                  </label>
                </div>
              </Field>

              <Field label="Name">
                <input name="name" value={form.name} onChange={handleChange} required className="input-light" />
              </Field>
              <Field label="Phone">
                <input name="phone" value={form.phone} onChange={handleChange} required className="input-light" />
              </Field>
              <Field label="Amount">
                <input name="amount" type="number" min="1" value={form.amount} onChange={handleChange} required className="input-light" />
              </Field>
              {form.type === "LOAN" && (
                <Field label="Tenure months">
                  <input name="tenure_months" type="number" min="1" max="120" value={form.tenure_months} onChange={handleChange} required className="input-light" />
                </Field>
              )}
              <Field label="Payment status">
                <select name="status" value={form.status} onChange={handleChange} className="input-light">
                  <option value="UNPAID">Unpaid</option>
                  <option value="PAID">Paid</option>
                </select>
              </Field>
              <Field label="Description" className="md:col-span-2">
                <textarea name="description" value={form.description} onChange={handleChange} rows="5" required className="input-light resize-none" />
              </Field>

              {error && <p className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 md:col-span-2">{error}</p>}

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
                >
                  {loading ? "Generating..." : "Generate Link"}
                </button>
              </div>
            </form>
          </section>

          <aside className="rounded-md border border-zinc-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-zinc-950">Generated link</h2>
            <p className="mt-2 text-sm text-zinc-500">
              After submit, the generated internal Mpoket URL appears here and is saved to the service history.
            </p>

            {generatedPaymentLink ? (
              <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <Check size={18} />
                  Link ready
                </div>
                <a href={generatedPaymentLink.payment_link} className="mt-3 block break-all text-sm font-medium text-zinc-950 underline-offset-4 hover:underline">
                  {fullLink}
                </a>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={copyGeneratedLink} className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800">
                    <Copy size={16} />
                    Copy
                  </button>
                  <a href={generatedPaymentLink.payment_link} className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-white">
                    <ExternalLink size={16} />
                    Open
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-md border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-500">
                No link generated in this session yet.
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
};

const Field = ({ label, children, className = "" }) => (
  <label className={`block text-sm font-medium text-zinc-700 ${className}`}>
    <span>{label}</span>
    <div className="mt-1">{children}</div>
  </label>
);

export default PayPage;
