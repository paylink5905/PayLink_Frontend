import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import DashboardSidebar from "../components/DashboardSidebar";
import ServicesTable from "../components/ServiceTable";
import useServiceStore from "../store/useServiceStore";

const emptyForm = {
  name: "",
  description: "",
  amount: "",
  tenure_months: "",
  phone: "",
  type: "ONE_TIME",
  status: "UNPAID",
};

const ManualServicesPage = () => {
  const { services, loading, error, getAllServices, createService, updateService } = useServiceStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [viewService, setViewService] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [activeTab, setActiveTab] = useState("ONE_TIME");

  useEffect(() => {
    getAllServices();
  }, [getAllServices]);

  const loanServices = services.filter(
    (service) => service.type === "LOAN"
  );

  const oneTimeServices = services.filter(
    (service) =>
      service.type === "ONE_TIME" ||
      service.type === "PRODUCT"
  );

  const openCreateModal = () => {
    setEditingService(null);

    setForm({
      ...emptyForm,
      type: activeTab,
    });

    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setForm({
      name: service.name || "",
      description: service.description || "",
      amount: service.amount || "",
      tenure_months: service.tenure_months || "",
      phone: service.phone || "",
      type: service.type === "LOAN" ? "LOAN" : "ONE_TIME",
      status: service.status || "UNPAID",
    });
    setActiveTab(
      service.type === "LOAN"
        ? "LOAN"
        : "ONE_TIME"
    );
    setModalOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
      ...(name === "type" && value === "ONE_TIME" ? { tenure_months: "" } : {}),
    }));
  };

  const buildPayload = () => {
    const payload = {
      name: form.name,
      description: form.description,
      amount: Number(form.amount),
      phone: form.phone,
      type: form.type,
      status: form.status,
      isGeneratePaymentLink: false,
    };

    if (form.type === "LOAN") {
      payload.tenure_months = Number(form.tenure_months);
    }

    return payload;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = buildPayload();
    const result = editingService
      ? await updateService(editingService.id, payload)
      : await createService(payload);

    console.log(result);
    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success(editingService ? "Manual service updated" : "Manual service added");
    setModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-zinc-100">
      <DashboardSidebar />

      <main className="min-w-0 flex-1">
        <header className="border-b border-zinc-200 bg-white px-5 py-4 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Manual entries</p>
              <h1 className="mt-1 text-2xl font-bold text-zinc-950">Manual services</h1>
            </div>
            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              <Plus size={18} />
              Add Service
            </button>
          </div>
        </header>

        <div className="space-y-6 px-5 py-6 lg:px-8">

          {error && <p className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}
          <div className="flex gap-2 rounded-lg bg-white p-2 border border-zinc-200">
            <button
              onClick={() => setActiveTab("LOAN")}
              className={`px-4 py-2 rounded-md font-medium transition ${activeTab === "LOAN"
                  ? "bg-zinc-950 text-white"
                  : "text-zinc-600 hover:bg-zinc-100"
                }`}
            >
              Loan Services
            </button>

            <button
              onClick={() => setActiveTab("ONE_TIME")}
              className={`px-4 py-2 rounded-md font-medium transition ${activeTab === "ONE_TIME"
                  ? "bg-zinc-950 text-white"
                  : "text-zinc-600 hover:bg-zinc-100"
                }`}
            >
              One-Time Payments
            </button>
          </div>
          <ServicesTable
            services={
              activeTab === "LOAN" ? loanServices : oneTimeServices
            }
            loading={loading}
            onView={setViewService}
            onEdit={openEditModal}
          />
        </div>
      </main>

      {modalOpen && (
        <ManualServiceModal
          editingService={editingService}
          form={form}
          loading={loading}
          onChange={handleChange}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      {viewService && (
        <ViewModal service={viewService} onClose={() => setViewService(null)} />
      )}
    </div>
  );
};

const ManualServiceModal = ({ editingService, form, loading, onChange, onClose, onSubmit }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <div className="w-full max-w-2xl rounded-md bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
        <h2 className="text-lg font-semibold text-zinc-950">{editingService ? "Update manual service" : "Add manual service"}</h2>
        <button type="button" onClick={onClose} className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100">
          <X size={18} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="grid gap-4 px-5 py-5 md:grid-cols-2">

        <Field label="Name">
          <input name="name" value={form.name} onChange={onChange} required className="input-light" />
        </Field>
        <Field label="Phone">
          <input name="phone" value={form.phone} onChange={onChange} required className="input-light" />
        </Field>
        <Field label="Amount">
          <input name="amount" type="number" min="0" value={form.amount} onChange={onChange} required className="input-light" />
        </Field>
        {form.type === "LOAN" && (
          <Field label="Tenure months">
            <input name="tenure_months" type="number" min="1" max="120" value={form.tenure_months} onChange={onChange} required className="input-light" />
          </Field>
        )}
        <Field label="Payment status">
          <select name="status" value={form.status} onChange={onChange} className="input-light">
            <option value="UNPAID">Unpaid</option>
            <option value="PAID">Paid</option>
          </select>
        </Field>
        <Field label="Description" className="md:col-span-2">
          <textarea name="description" value={form.description} onChange={onChange} required rows="4" className="input-light resize-none" />
        </Field>

        <div className="flex justify-end gap-3 border-t border-zinc-200 pt-4 md:col-span-2">
          <button type="button" onClick={onClose} className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60">
            {loading ? "Saving..." : editingService ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  </div>
);

const ViewModal = ({ service, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <div className="w-full max-w-xl rounded-md bg-white p-5 shadow-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-950">{service.name}</h2>
        <button type="button" onClick={onClose} className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100">
          <X size={18} />
        </button>
      </div>
      <dl className="mt-5 grid gap-4 text-sm md:grid-cols-2">
        <Detail label="Amount" value={`Rs. ${Number(service.amount || 0).toLocaleString("en-IN")}`} />
        <Detail label="Status" value={service.status} />
        <Detail label="Type" value={service.type === "LOAN" ? "Loan" : "One-time"} />
        {service.type === "LOAN" && <Detail label="Tenure" value={`${service.tenure_months} months`} />}
        <Detail label="Phone" value={service.phone} />
        <Detail label="Payment link" value="Manual entry" />
        <Detail label="Description" value={service.description} wide />
      </dl>
    </div>
  </div>
);

const Field = ({ label, children, className = "" }) => (
  <label className={`block text-sm font-medium text-zinc-700 ${className}`}>
    <span>{label}</span>
    <div className="mt-1">{children}</div>
  </label>
);

const Detail = ({ label, value, wide }) => (
  <div className={wide ? "md:col-span-2" : ""}>
    <dt className="font-medium text-zinc-500">{label}</dt>
    <dd className="mt-1 wrap-break-word rounded-md bg-zinc-50 px-3 py-2 text-zinc-950">{value}</dd>
  </div>
);

export default ManualServicesPage;
