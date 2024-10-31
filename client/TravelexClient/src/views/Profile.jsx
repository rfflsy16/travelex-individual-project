import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile({ base_url }) {
  const [user, setUser] = useState({ email: "", imgUrl: "" });
  const [loading, setLoading] = useState(true);

  // Async function untuk mengambil data profile
  const fetchProfile = async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await axios.get(`${base_url}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Memanggil fetchProfile di dalam useEffect
  useEffect(() => {
    fetchProfile();
  }, [base_url]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card bg-gray-700 shadow-lg rounded-lg p-8 text-center">
          <img
            src={user.imgUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h2 className="text-lg font-semibold">{user.email}</h2>
        </div>
      )}
    </div>
  );
}
