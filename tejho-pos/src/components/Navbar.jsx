import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-white font-bold"
      : "text-white/80 hover:text-white transition";

  return (
    <nav
      className="shadow"
      style={{ backgroundColor: "#c2061d" }}
    >
      <div className="flex items-center justify-between px-5 py-4">

        {/* Logo */}
        <img
          src={logo}
          alt="Tejho Logo"
          className="h-16 md:h-20 w-auto"
        />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8">
          <NavLink to="/" className={linkStyle}>
            POS
          </NavLink>

          <NavLink
            to="/transactions"
            className={linkStyle}
          >
            Transactions
          </NavLink>

          <NavLink
            to="/products"
            className={linkStyle}
          >
            Products
          </NavLink>

          <NavLink
            to="/settings"
            className={linkStyle}
          >
            Settings
          </NavLink>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden text-white text-4xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile / Tablet Menu */}
      {open && (
        <div
          className="lg:hidden flex flex-col px-5 pb-5 gap-4"
          style={{ backgroundColor: "#c2061d" }}
        >
          <NavLink
            to="/"
            className={linkStyle}
            onClick={() => setOpen(false)}
          >
            POS
          </NavLink>

          <NavLink
            to="/transactions"
            className={linkStyle}
            onClick={() => setOpen(false)}
          >
            Transactions
          </NavLink>

          <NavLink
            to="/products"
            className={linkStyle}
            onClick={() => setOpen(false)}
          >
            Products
          </NavLink>

          <NavLink
            to="/settings"
            className={linkStyle}
            onClick={() => setOpen(false)}
          >
            Settings
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;