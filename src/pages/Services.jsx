import { useEffect, useState } from "react";
import { X } from "lucide-react";
import DashboardSidebar from "../components/DashboardSidebar";
import PaymentLinksTable from "../components/PaymentLinksTable";
import usePaymentLinkStore from "../store/usePaymentLinkStore";

const Services = () => {
  const { paymentLinks, loading, error, getAllPaymentLinks } = usePaymentLinkStore();
  const [viewRecord, setViewRecord] = useState(null);

  useEffect(() => {
    getAllPaymentLinks();
  }, [getAllPaymentLinks]);


  return (
    <div className="flex min-h-screen bg-zinc-100">
      <DashboardSidebar />

      <main className="min-w-0 flex-1">
        <header className="border-b border-zinc-200 bg-white px-5 py-4 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Records</p>
          <h1 className="mt-1 text-2xl font-bold text-zinc-950">Payment link history</h1>
        </header>

        <div className="space-y-6 px-5 py-6 lg:px-8">

          {error && <p className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

          <PaymentLinksTable
            paymentLinks={paymentLinks}
            loading={loading}
            onView={setViewRecord}
          />
        </div>
      </main>

      {viewRecord && (
        <RecordModal record={viewRecord} onClose={() => setViewRecord(null)} />
      )}
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="rounded-md border border-zinc-200 bg-white p-5">
    <p className="text-sm font-medium text-zinc-500">{label}</p>
    <p className="mt-2 text-2xl font-bold text-zinc-950">Rs. {Number(value || 0).toLocaleString("en-IN")}</p>
  </div>
);

const RecordModal = ({ record, onClose }) => {
  const fullLink = `${window.location.origin}${record.payment_link}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-md bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-950">{record.service?.name}</h2>
          <button type="button" onClick={onClose} className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100">
            <X size={18} />
          </button>
        </div>
        <dl className="mt-5 grid gap-4 text-sm md:grid-cols-2">
          <Detail label="Amount" value={`Rs. ${Number(record.service?.amount || 0).toLocaleString("en-IN")}`} />
          <Detail label="Link status" value={record.status} />
          <Detail label="Service status" value={record.service?.status} />
          <Detail label="Type" value={record.service?.type === "LOAN" ? "Loan" : "One-time"} />
          {record.service?.type === "LOAN" && (
            <Detail label="Tenure" value={`${record.service?.tenure_months} months`} />
          )}
          <Detail label="Phone" value={record.service?.phone} />
          <Detail label="Expires" value={new Date(record.expiry_date).toLocaleDateString("en-IN")} />
          <Detail label="Payment link" value={fullLink} wide />
          <Detail label="Description" value={record.service?.description} wide />
        </dl>
      </div>
    </div>
  );
};

const Detail = ({ label, value, wide }) => (
  <div className={wide ? "md:col-span-2" : ""}>
    <dt className="font-medium text-zinc-500">{label}</dt>
    <dd className="mt-1 break-words rounded-md bg-zinc-50 px-3 py-2 text-zinc-950">{value}</dd>
  </div>
);

export default Services;
