import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar({ base_url }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ imgUrl: "", username: "" });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("access_token");

      try {
        const response = await axios.get(`${base_url}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [base_url]);

  function logout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  return (
    <div className="navbar bg-gradient-to-r from-green-200 via-teal-100 to-green-300 text-gray-800 shadow-md px-4">
      <div className="navbar-start flex items-center space-x-3">
        <Link to="/" className="flex items-center">
          <img
            src="https://st.depositphotos.com/2208320/2217/v/450/depositphotos_22177723-stock-illustration-green-earth-vector-illustration.jpg"
            alt="Travelex Logo"
            className="w-10 h-10 object-cover"
          />
          <span className="ml-2 text-2xl font-bold text-gray-800 hover:text-teal-700 transition-all duration-300">
            Travelex
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <Link
              to="/wishlist"
              className="hover:text-teal-700 transition-all duration-300"
            >
              Wishlist
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        <Link
          to="/profile"
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-teal-500"
        >
          <img
            src={
              user.imgUrl ||
              "https://img.freepik.com/premium-vector/gray-circular-user-icon-darker-inner-silhouette-within-light-gray-circle-minimal-modern-style_213497-4884.jpg?w=1060"
            }
            alt={user.username}
            className="w-full h-full object-cover"
          />
        </Link>

        <button
          className="btn bg-gradient-to-r from-teal-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold shadow-lg rounded-lg px-4 py-2 transform hover:scale-105 transition-all duration-300"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
