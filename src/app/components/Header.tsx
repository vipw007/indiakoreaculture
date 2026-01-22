import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import {
  Globe,
  Building2,
  MessageCircle,
  Users,
  Menu,
  X,
  LogOut,
  LogIn,
  Languages
} from "lucide-react";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "ko" : "en");
  };

  const navItems = [
    { path: "/", label: t("header.home"), icon: Globe },
    { path: "/tourism", label: t("header.tourism"), icon: Globe },
    { path: "/office-culture", label: t("header.office"), icon: Building2 },
    { path: "/chatbot", label: t("header.chatbot"), icon: MessageCircle },
    { path: "/community", label: t("header.community"), icon: Users }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 flex-nowrap">

            {/* LOGO */}
            <Link to="/" className="flex items-center space-x-2 min-w-0">
              <img
                  src="/favicon.svg"
                  alt="Logo"
                  className="h-8 w-8 shrink-0"
              />

              {/* Full name only on large screens */}
              <span className="hidden lg:inline text-xl font-bold text-gray-900 truncate whitespace-nowrap">
              {t("homepage.title")}
            </span>

              {/* Short name for mobile & tablet */}
              <span className="lg:hidden text-xl font-bold text-gray-900 whitespace-nowrap">
                {t("homepage.title")}
            </span>
            </Link>

            {/* DESKTOP MENU (≥1024px) */}
            <nav className="hidden lg:flex items-center gap-1 whitespace-nowrap">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                    location.pathname === item.path ||
                    (item.path !== "/" &&
                        location.pathname.startsWith(item.path));

                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm transition-colors ${
                            isActive
                                ? "bg-indigo-100 text-indigo-700"
                                : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                );
              })}

              {user ? (
                  <button
                      onClick={handleLogout}
                      className="ml-3 flex items-center gap-1 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t("header.logout")}</span>
                  </button>
              ) : (
                  <Link
                      to="/login"
                      className="ml-3 flex items-center gap-1 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>{t("header.login")}</span>
                  </Link>
              )}

              <button
                  onClick={toggleLanguage}
                  className="ml-2 p-2 rounded-md text-gray-700 hover:bg-gray-100"
                  aria-label="Toggle language"
              >
                <Languages className="h-5 w-5" />
              </button>
            </nav>

            {/* MOBILE / TABLET HAMBURGER */}
            <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                  <X className="h-6 w-6" />
              ) : (
                  <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
            <div className="lg:hidden bg-white border-t">
              <nav className="px-4 py-3 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                      location.pathname === item.path ||
                      (item.path !== "/" &&
                          location.pathname.startsWith(item.path));

                  return (
                      <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                              isActive
                                  ? "bg-indigo-100 text-indigo-700"
                                  : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                  );
                })}

                {user ? (
                    <button
                        onClick={() => {
                          handleLogout();
                          setMobileOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t("header.logout")}</span>
                    </button>
                ) : (
                    <Link
                        to="/login"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>{t("header.login")}</span>
                    </Link>
                )}

                <button
                    onClick={() => {
                      toggleLanguage();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Languages className="h-4 w-4" />
                  <span>
                {i18n.language === "en"
                    ? "Switch to Korean"
                    : "Switch to English"}
              </span>
                </button>
              </nav>
            </div>
        )}
      </header>
  );
}