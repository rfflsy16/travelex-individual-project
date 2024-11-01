import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import MapModal from "../components/MapModal";
import RecommendationSidebar from "../components/Recommendation";

export default function HomePage({ base_url }) {
  const [destination, setDestination] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetchDestination();
    fetchRecommendations();
  }, []);

  async function fetchDestination(query = "") {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/home`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
        params: { search: query },
      });
      setDestination(data.destination);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRecommendations() {
    try {
      const { data } = await axios.get(`${base_url}/home/recomendation`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      setRecommendations(data.text);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    fetchDestination(search);
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${base_url}/home/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      setDestination((prevDestinations) =>
        prevDestinations.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6 space-y-4">
      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-lg flex mb-6 shadow-md"
      >
        <input
          type="text"
          placeholder="Search for destinations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow p-3 rounded-l-lg border border-gray-300 bg-gray-50 text-gray-800"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-teal-500 to-green-600 text-white px-6 rounded-r-lg"
        >
          Search
        </button>
      </form>

      {/* Main Content */}
      <div className="flex flex-row space-x-4">
        {/* Destination List */}
        <div className="flex-grow">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-6">
              {destination.map((item) => (
                <Card
                  key={item.id}
                  name={item.name}
                  location={item.location}
                  description={item.description}
                  rating={item.rating}
                  imgUrl={item.imgUrl}
                  onClick={() => setSelectedDestination(item)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recommendation Sidebar */}
        <div className="w-1/4">
          <RecommendationSidebar recommendations={recommendations} />
        </div>
      </div>

      {/* Map Modal */}
      {selectedDestination && (
        <MapModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </div>
  );
}
