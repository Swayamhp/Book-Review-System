import React, { useState } from "react";
import { useUser } from "./UserContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import AddBookModal from "./AddBookModal.jsx";

const NavBar = () => {
  const { user, logout } = useUser();
  const [isModalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout?.();
    navigate("/login");
  };
  console.log(user);
  const avatarSrc =`${user?.avatar}`  ;

  return (
    <>
      <nav className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-wide">
            BookReview
          </Link>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Add Book */}
            {user?.isAdmin && user && (
              <button
                onClick={() => setModalOpen(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
              >
                Add Book
              </button>
            )}

            {/* Auth / Profile */}
            {user ? (
              <div className="relative">
                <img
                  src={avatarSrc}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover cursor-pointer"
                />

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border z-50">
                    <div
                      className={`text-xs font-semibold text-center py-2 ${
                        user.isAdmin
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-gray-100 text-gray-700"
                      } rounded-t-lg`}
                    >
                      {user.isAdmin ? "Admin" : "User"}
                    </div>

                    <Link
                      to={`/users/${user._id}`}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      View Profile
                    </Link>

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-b-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Modal */}
      <AddBookModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default NavBar;



