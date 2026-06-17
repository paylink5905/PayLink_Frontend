import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../components/Button";
import InputField from "../components/InputField";
import Navbar from "../components/Navbar";
import useAuthStore from "../store/useAuthStore";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { sendResetOtp, resetPassword, loading } = useAuthStore();
  const [otpSent, setOtpSent] = useState(false);
  const [form, setForm] = useState({ email: "", otp: "", password: "" });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    const result = await sendResetOtp({ email: form.email });
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("OTP sent to your email");
    setOtpSent(true);
  };

  const handleReset = async (event) => {
    event.preventDefault();
    const result = await resetPassword(form);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Password reset successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-md border border-zinc-800 bg-zinc-900/60 p-8">
          <h1 className="text-3xl font-bold">Reset password</h1>
          <p className="mt-2 text-sm text-zinc-400">Request an OTP and set a new password.</p>

          <form onSubmit={otpSent ? handleReset : handleSendOtp} className="mt-6 space-y-4">
            <InputField
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              disabled={otpSent}
            />

            {otpSent && (
              <>
                <InputField
                  name="otp"
                  type="text"
                  placeholder="6 digit OTP"
                  value={form.otp}
                  onChange={handleChange}
                  required
                />
                <InputField
                  name="password"
                  type="password"
                  placeholder="New password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <Button type="submit" disabled={loading}>
              {loading ? "Please wait..." : otpSent ? "Reset Password" : "Send OTP"}
            </Button>
          </form>

          <Link to="/login" className="mt-5 inline-block text-sm font-medium text-zinc-300 hover:text-white">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
