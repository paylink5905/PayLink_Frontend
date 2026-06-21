import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import Button from "../components/Button";
import useAuthStore from "../store/useAuthStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await login(form);
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("Logged in successfully");
    navigate("/pay");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-md border border-zinc-800 bg-zinc-900/60 p-8">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="mt-2 text-sm text-zinc-400">Access your personal Mpoket dashboard.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <InputField
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />

            <InputField
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
            />

            <Button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Link to="/forgot-password" className="mt-5 inline-block text-sm font-medium text-zinc-300 hover:text-white">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
