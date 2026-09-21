import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const { itemCount } = useContext(CartContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            Online Store
          </Link>

          <div className="hidden sm:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">
              Products
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900 font-medium relative">
              Cart ({itemCount})
            </Link>
            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                  Welcome, {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="sm:hidden pb-4 space-y-2">
            <Link to="/" className="block text-gray-600 hover:text-gray-900 font-medium py-2">
              Home
            </Link>
            <Link to="/" className="block text-gray-600 hover:text-gray-900 font-medium py-2">
              Products
            </Link>
            <Link to="/cart" className="block text-gray-600 hover:text-gray-900 font-medium py-2">
              Cart ({itemCount})
            </Link>
            {user ? (
              <>
                <span className="block text-gray-700 font-medium py-2">
                  Welcome, {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="block text-red-500 hover:text-red-700 font-medium py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium text-center"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;