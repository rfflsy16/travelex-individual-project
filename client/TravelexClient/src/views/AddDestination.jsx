import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function AddDestination({ base_url }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const body = { name, location, description, rating };
      const { data } = await axios.post(`${base_url}/home`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      Toastify({
        text: "Success add Destination",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#4CAF50", // Warna hijau untuk notifikasi sukses
          color: "white",
        },
      }).showToast();

      navigate("/");
    } catch (error) {
      console.error(error);
      Toastify({
        text: "Failed Add Destination",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#F44336", // Warna merah untuk notifikasi gagal
          color: "white",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Add Destination
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter destination name"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter location"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Enter description"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">Rating:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter rating (1-5)"
              required
            />
          </div>
          <button
            type="submit"
            className={`btn btn-primary w-full mt-4 ${
              loading ? "loading" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Add Destination"}
          </button>
        </form>
      </div>
    </div>
  );
}
