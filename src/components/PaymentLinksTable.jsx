import { Copy, ExternalLink, Eye } from "lucide-react";
import toast from "react-hot-toast";

const statusClass = {
  PENDING: "bg-amber-100 text-amber-700",
  PAID: "bg-emerald-100 text-emerald-700",
  EXPIRED: "bg-zinc-100 text-zinc-700",
  CANCELLED: "bg-rose-100 text-rose-700",
};

const typeLabel = {
  LOAN: "Loan",
  ONE_TIME: "One-time",
  PRODUCT: "One-time",
};

const PaymentLinksTable = ({ paymentLinks = [], loading, onView }) => {
  const getFullLink = (link) => `${window.location.origin}${link}`;

  const copyLink = async (link) => {
    await navigator.clipboard.writeText(getFullLink(link));
    toast.success("Payment link copied");
  };

  return (
    <div className="overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-zinc-950">Generated payment links</h2>
        <p className="mt-1 text-sm text-zinc-500">All links created from the /pay generator.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1020px]">
          <thead>
            <tr className="border-b bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              <th className="px-5 py-3">Customer / Service</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Link</th>
              <th className="px-5 py-3">Expires</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100 text-sm">
            {loading ? (
              <tr>
                <td colSpan="8" className="px-5 py-14 text-center text-zinc-500">
                  Loading payment links...
                </td>
              </tr>
            ) : paymentLinks.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-5 py-14 text-center text-zinc-500">
                  No generated payment links yet.
                </td>
              </tr>
            ) : (
              paymentLinks.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-zinc-50">
                  <td className="px-5 py-4">
                    <h3 className="font-semibold text-zinc-950">{item.service?.name}</h3>
                    <p className="mt-1 max-w-xs truncate text-zinc-500">{item.service?.description}</p>
                  </td>
                  <td className="px-5 py-4 text-zinc-600">{typeLabel[item.service?.type] || item.service?.type}</td>
                  <td className="px-5 py-4 font-semibold text-zinc-950">
                    Rs. {Number(item.service?.amount || 0).toLocaleString("en-IN")}
                  </td>
                  <td className="px-5 py-4 text-zinc-600">{item.service?.phone}</td>
                  <td className="px-5 py-4">
                    <a
                      href={item.payment_link}
                      className="inline-flex max-w-[220px] items-center gap-2 truncate font-medium text-zinc-950 underline-offset-4 hover:underline"
                    >
                      {getFullLink(item.payment_link)}
                    </a>
                  </td>
                  <td className="px-5 py-4 text-zinc-600">
                    {new Date(item.expiry_date).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass[item.status] || "bg-zinc-100 text-zinc-700"}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => onView(item)} className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950" title="View">
                        <Eye size={18} />
                      </button>
                      <button type="button" onClick={() => copyLink(item.payment_link)} className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950" title="Copy link">
                        <Copy size={18} />
                      </button>
                      <a href={item.payment_link} className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950" title="Open link">
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentLinksTable;
