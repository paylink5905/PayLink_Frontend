import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import InputField from "../components/InputField";
import Button from "../components/Button";

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="flex justify-center items-center py-20 px-6">
        <div className="w-full max-w-md border border-zinc-800 bg-zinc-900/50 rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-6">
            Create Account
          </h1>

          <form className="space-y-4">
            <InputField
              type="text"
              placeholder="Full Name"
            />

            <InputField
              type="email"
              placeholder="Email Address"
            />

            <InputField
              type="password"
              placeholder="Password"
            />

            <Button type="submit">
              Sign Up
            </Button>
          </form>

          <p className="text-center text-zinc-400 mt-6">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-white hover:underline"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;