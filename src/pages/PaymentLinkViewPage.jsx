import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPublicPaymentLinkService } from "../service/paymentLinkService";

const PaymentLinkViewPage = () => {
  const { token } = useParams();
  const [paymentLink, setPaymentLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPaymentLink = async () => {
      try {
        const data = await getPublicPaymentLinkService(token);
        setPaymentLink(data);
      } catch (err) {
        setError(err.response?.data?.message || "Payment link not found");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentLink();
  }, [token]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="mx-auto flex max-w-3xl items-center justify-center px-6 py-20">
        <section className="w-full rounded-md border border-zinc-800 bg-zinc-900/60 p-6">
          {loading ? (
            <p className="text-zinc-400">Loading payment link...</p>
          ) : error ? (
            <p className="text-rose-300">{error}</p>
          ) : (
            <>
              <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Payment request</p>
              <h1 className="mt-3 text-3xl font-bold">{paymentLink.service?.name}</h1>
              <p className="mt-3 text-zinc-400">{paymentLink.service?.description}</p>

              <div className="mt-6 rounded-md bg-zinc-950 p-5">
                <p className="text-sm text-zinc-500">Amount</p>
                <p className="mt-1 text-4xl font-bold">
                  Rs. {Number(paymentLink.service?.amount || 0).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
                <Info label="Type" value={paymentLink.service?.type === "LOAN" ? "Loan" : "One-time"} />
                <Info label="Status" value={paymentLink.status} />
                <Info label="Phone" value={paymentLink.service?.phone} />
                <Info label="Expires" value={new Date(paymentLink.expiry_date).toLocaleDateString("en-IN")} />
                {paymentLink.service?.type === "LOAN" && (
                  <Info label="Tenure" value={`${paymentLink.service?.tenure_months} months`} />
                )}
              </div>

              <button
                type="button"
                disabled
                className="mt-6 w-full rounded-md bg-white px-5 py-3 font-semibold text-black opacity-60"
              >
                Razorpay payment will be enabled after API setup
              </button>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="rounded-md border border-zinc-800 bg-zinc-950 px-4 py-3">
    <p className="text-zinc-500">{label}</p>
    <p className="mt-1 font-semibold text-white">{value}</p>
  </div>
);

export default PaymentLinkViewPage;
