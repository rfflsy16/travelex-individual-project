export default function Recommendation({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return <p>Loading recommendations...</p>;
  }

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-4">Recommended Destinations</h2>
      {Object.entries(recommendations).map(([category, places]) => (
        <div key={category} className="mb-6">
          <h3 className="text-xl font-semibold text-teal-700 mb-2">
            {category}
          </h3>
          <ul className="list-disc ml-5">
            {places.map((place, index) => (
              <li key={index} className="text-gray-700">
                {place}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
