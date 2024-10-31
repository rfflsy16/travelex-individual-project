export default function Card({ name, location, description, rating }) {
  return (
    <div className="card w-80 bg-white shadow-xl rounded-lg p-6 m-4">
      <div className="card-body">
        <h2 className="card-title text-2xl font-semibold">
          {name || "Nama tidak tersedia"}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          <strong>Lokasi:</strong> {location || "Lokasi tidak tersedia"}
        </p>
        <p className="mt-4 text-gray-600">
          {description || "Deskripsi tidak tersedia"}
        </p>
        <div className="card-actions justify-end mt-6">
          <span className="badge badge-info p-2 text-gray-800 font-medium bg-teal-200">
            Rating: {rating !== null && rating !== undefined ? rating : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
}
