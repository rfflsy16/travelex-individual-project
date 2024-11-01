// src/components/AddWishlist.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Toastify from "toastify-js";

export default function AddWishlist({ base_url, onAdd }) {
  const [userId, setUserId] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Planned");
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch destinations for the dropdown
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data } = await axios.get(`${base_url}/destinations`);
        setDestinations(data.destinations);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, [base_url]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${base_url}/wishlist`,
        { userId, destination_id: destinationId, category, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      Toastify({
        text: "Success add Wishlist",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        style: {
          background: "#4CAF50",
          color: "white",
        },
      }).showToast();

      // Clear form fields and notify the parent component of the new item
      setUserId("");
      setDestinationId("");
      setCategory("");
      setStatus("Planned");
      onAdd(data.wishlist); // Call the function passed down to update the list
    } catch (error) {
      console.error("Error adding wishlist:", error);
      Toastify({
        text: "Failed to add Wishlist",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
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
    <center>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mt-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Add Wishlist
        </h2>

        <label className="block mb-3">
          <span className="text-gray-700">User ID:</span>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200"
            placeholder="Enter User ID"
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Destination:</span>
          <select
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200"
            required
          >
            <option value="">Select Destination</option>
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Category:</span>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200"
            placeholder="Enter Category"
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-700">Status:</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-teal-200"
            required
          >
            <option value="Planned">Planned</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-4 py-2 px-4 bg-gradient-to-r from-teal-400 to-green-500 text-white font-semibold rounded-md shadow-md hover:from-teal-500 hover:to-green-600 transition-all duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Adding..." : "Add Wishlist"}
        </button>
      </form>
    </center>
  );
}
