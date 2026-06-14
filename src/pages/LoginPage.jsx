import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import Button from "../components/Button";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="flex justify-center items-center py-20 px-6">
        <div className="w-full max-w-md border border-zinc-800 bg-zinc-900/50 rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-6">Login</h1>

          <form className="space-y-4">
            <InputField
              type="email"
              placeholder="Email Address"
            />

            <InputField
              type="password"
              placeholder="Password"
            />

            <Button type="submit">
              Login
            </Button>
          </form>

          <p className="text-center text-zinc-400 mt-6">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="text-white hover:underline"
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;