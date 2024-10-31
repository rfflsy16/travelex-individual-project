import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

export default function HomePage({ base_url }) {
  const [destination, setDestination] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  async function fetchDestination(query = "") {
    try {
      setLoading(true);
      const { data } = await axios.get(`${base_url}/home`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        params: {
          search: query,
        },
      });
      setDestination(data.destination);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    fetchDestination(search);
  }

  useEffect(() => {
    fetchDestination();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
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
          className="flex-grow p-3 rounded-l-lg border border-gray-300 bg-gray-50 text-gray-800 outline-none placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-teal-500 to-green-600 text-white font-semibold px-6 rounded-r-lg hover:from-teal-600 hover:to-green-700 transition-all duration-300"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-teal-500 font-semibold">Loading...</p>}

      <div className="flex flex-wrap justify-center gap-6">
        {destination.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            location={item.location}
            description={item.description}
            rating={item.rating}
          />
        ))}
      </div>
    </div>
  );
}
