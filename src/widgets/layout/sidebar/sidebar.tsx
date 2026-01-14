import { useState } from "react";
import {
  Home,
  ShoppingBag,
  Users,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { logout } from "@entities/user";
import { useDispatch } from "react-redux";
import { IconButton } from "@shared/ui";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  // { label: "Панель управления", icon: <Home size={20} />, href: "/admin" },
  { label: "Заказы", icon: <ShoppingBag size={20} />, href: "/admin/orders" },
  { label: "Продукты", icon: <Package size={20} />, href: "/admin/products" },
  // { label: "Клиенты", icon: <Users size={20} />, href: "/admin/customers" },
  // {
  //   label: "Аналитика",
  //   icon: <BarChart3 size={20} />,
  //   href: "/admin/analytics",
  // },
  { label: "Настройки", icon: <Settings size={20} />, href: "/admin/settings" },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen flex flex-col bg-white border-r border-slate-200 shadow-sm
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-20" : "w-64"}`}
    >
      <div className="flex items-center justify-between px-4 h-16 border-b border-slate-200">
        {!collapsed && (
          <span className="text-base font-semibold text-slate-800">
            Админ панель
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md text-slate-600 hover:bg-slate-100 transition"
        >
          <Menu size={20} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group flex items-center gap-3 px-3 py-2 rounded-md
              text-slate-600 hover:text-slate-900
              hover:bg-slate-100 transition"
          >
            <span className="text-slate-500 group-hover:text-slate-900 transition">
              {item.icon}
            </span>
            {!collapsed && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </a>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-slate-200">
        <IconButton
          onClick={() => dispatch(logout())}
          icon={<LogOut size={20} />}
          variant="ghost"
          className="w-full flex items-center gap-3 px-3 py-4! rounded-md
            text-slate-500 hover:text-red-600 hover:bg-red-50 transition"
        >
          Logout
        </IconButton>
      </div>
    </aside>
  );
};

export default Sidebar;
