import { Eye, Pencil } from "lucide-react";

const statusClass = {
  PAID: "bg-emerald-100 text-emerald-700",
  UNPAID: "bg-rose-100 text-rose-700",
};

export default function ServicesTable({
  services = [],
  loading,
  onView,
  onEdit,
  isLoan = false,
}) {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-zinc-950">
          {isLoan ? "Loan Services" : "One-Time Services"}
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Manually managed service records.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b bg-zinc-50 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
              <th className="px-5 py-3">Service</th>
              <th className="px-5 py-3">Amount</th>

              {isLoan && (
                <th className="px-5 py-3">Tenure</th>
              )}

              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-100 text-sm">
            {loading ? (
              <tr>
                <td
                  colSpan={isLoan ? 6 : 5}
                  className="px-5 py-14 text-center text-zinc-500"
                >
                  Loading services...
                </td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td
                  colSpan={isLoan ? 6 : 5}
                  className="px-5 py-14 text-center text-zinc-500"
                >
                  No services found.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr
                  key={service.id}
                  className="transition-colors hover:bg-zinc-50"
                >
                  <td className="px-5 py-4">
                    <div>
                      <h3 className="font-semibold text-zinc-950">
                        {service.name}
                      </h3>
                      <p className="mt-1 max-w-xs truncate text-zinc-500">
                        {service.description}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 font-semibold text-zinc-950">
                    Rs.{" "}
                    {Number(service.amount || 0).toLocaleString("en-IN")}
                  </td>

                  {isLoan && (
                    <td className="px-5 py-4 text-zinc-600">
                      {service.tenure_months
                        ? `${service.tenure_months} months`
                        : "-"}
                    </td>
                  )}

                  <td className="px-5 py-4 text-zinc-600">
                    {service.phone}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        statusClass[service.status] ||
                        "bg-zinc-100 text-zinc-700"
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onView(service)}
                        className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950"
                        title="View service"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(service)}
                        className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950"
                        title="Edit service"
                      >
                        <Pencil size={18} />
                      </button>
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
}