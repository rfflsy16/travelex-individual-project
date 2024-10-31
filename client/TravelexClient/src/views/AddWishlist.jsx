import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

export default function AddWishlist({ base_url }) {
  const [userId, setUserId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Planned");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const body = { userId, destinationId, category, status };
      const { data } = await axios.post(`${base_url}/wishlist`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Toastify({
        text: "Success add Wishlist",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#4CAF50",
          color: "white",
        },
      }).showToast();

      navigate("/wishlist");
    } catch (error) {
      console.error(error);
      Toastify({
        text: "Failed to add Wishlist",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#F44336",
          color: "white",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="card w-full max-w-md bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Add Wishlist
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">User ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter user ID"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">Destination ID:</label>
            <input
              type="text"
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter destination ID"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter category"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select select-bordered w-full"
              required
            >
              <option value="Planned">Planned</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            className={`btn btn-primary w-full mt-4 ${
              loading ? "loading" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Add Wishlist"}
          </button>
        </form>
      </div>
    </div>
  );
}
