import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-600 hover:text-blue-600";

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">
            TEJHO POS
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex gap-8">
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

      </div>
    </nav>
  );
}

export default Navbar;