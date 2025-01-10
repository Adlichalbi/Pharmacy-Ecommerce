import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Search, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchQuery) return;

    navigate(`/search/${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-emerald-400 items-center space-x-2 flex">
            Pharmacy
          </Link>

          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 w-1/3">
            <input
              type="text"
              placeholder="Search by product name"
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-gray-800 text-white px-3 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button type="submit" className="text-gray-300 hover:text-emerald-400">
              <span className="sr-only">Search</span>
              <Search className="w-5 h-5" />
            </button>
          </form>

          <nav className="flex flex-wrap items-center gap-4">
            <Link to="/" className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out">
              Home
            </Link>

            {user && (
              <Link
                to="/cart"
                className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                <ShoppingCart className="inline-block mr-1 group-hover:text-emerald-400" size={20} />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {/* My Orders Link */}
            {user && (
              <Link
                to="/my-orders"
                className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                <ShoppingBag className="inline-block mr-1" size={20} />
                <span className="hidden sm:inline">My Orders</span>
              </Link>
            )}

            {/* Admin Dashboard Link */}
            {isAdmin && (
              <Link
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                to="/secret-dashboard"
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {/* Authentication Links */}
            {user ? (
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
