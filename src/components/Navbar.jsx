import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const NAV_ITEMS = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Privacy", path: "/privacy-policy" },
    { title: "Terms", path: "/terms-and-conditions" },
  ];

  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <NavLink
            to="/"
            className="text-xl font-bold text-white tracking-wide"
          >
            PayLink
          </NavLink>

          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>

          <NavLink
            to="/login"
            className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition"
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;