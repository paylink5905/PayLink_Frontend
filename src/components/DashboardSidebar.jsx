import { CreditCard, FileText, Home, Info, ListPlus, LogOut, Mail, PlusCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const items = [
    { label: "Home", path: "/", icon: Home },
    { label: "Generate Link", path: "/pay", icon: PlusCircle },
    { label: "Services", path: "/services", icon: CreditCard },
    { label: "Payment Records", path: "/manual-services", icon: ListPlus },
    { label: "About", path: "/about", icon: Info },
    { label: "Contact", path: "/contact", icon: Mail },
    { label: "Terms", path: "/terms-and-conditions", icon: FileText },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-zinc-800 bg-zinc-950 px-4 py-5 text-white lg:flex lg:flex-col">
      <NavLink to="/services" className="mb-8 flex items-center gap-3 px-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-zinc-950">
          <CreditCard size={20} />
        </span>
        <div>
          <p className="text-lg font-bold">PayLink</p>
          <p className="text-xs text-zinc-500">Personal dashboard</p>
        </div>
      </NavLink>

      <nav className="flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-zinc-950"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`
              }
            >
              <Icon size={17} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-4 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-950/40 hover:text-red-200"
      >
        <LogOut size={17} />
        Logout
      </button>
    </aside>
  );
};

export default DashboardSidebar;
