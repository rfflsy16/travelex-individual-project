import { useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddWishlist = () => {
    console.log("Add Wishlist clicked");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      {/* Add Wishlist Button */}
      <button
        onClick={handleAddWishlist}
        className="mb-6 px-6 py-3 bg-gradient-to-r from-teal-400 to-green-500 text-white font-semibold rounded-full shadow-md hover:from-teal-500 hover:to-green-600 transition-all duration-300"
      >
        Add Wishlist
      </button>

      {/* Wishlist Card */}
      <div className="card w-80 bg-gray-50 text-gray-800 shadow-lg rounded-lg overflow-hidden m-4">
        <div className="card-body p-6">
          <h3 className="card-title text-2xl font-semibold mb-4">
            Wishlist Item
          </h3>
          <p className="text-sm text-gray-700 mb-2">
            <strong>User ID:</strong> 1
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Destination ID:</strong> 101
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Category:</strong> Romantic
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Status:</strong> Planned
          </p>
          <div className="card-actions justify-end mt-4">
            <span className="badge bg-gray-200 text-teal-600 font-semibold py-1 px-3 rounded-full shadow-md">
              Planned
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
