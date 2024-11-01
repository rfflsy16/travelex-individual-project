export default function Card({
  name,
  location,
  description,
  rating,
  imgUrl,
  onClick,
  onDelete,
}) {
  const defaultImage = "https://via.placeholder.com/400x300.png?text=Wisata";

  return (
    <div
      className="card w-80 bg-white shadow-lg rounded-lg p-4 m-4 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-t-lg">
        <img
          src={imgUrl || defaultImage}
          alt={name || "Nama tidak tersedia"}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
      </div>

      <div className="card-body p-4">
        <h2 className="card-title text-xl font-semibold text-gray-800">
          {name || "Nama tidak tersedia"}
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Lokasi:</strong> {location || "Lokasi tidak tersedia"}
        </p>
        <p className="mt-3 text-gray-700">
          {description || "Deskripsi tidak tersedia"}
        </p>

        <div className="card-actions flex justify-between mt-4">
          <span className="badge bg-teal-200 text-teal-800 font-semibold py-1 px-3 rounded-full shadow-md">
            Rating: {rating !== null && rating !== undefined ? rating : "N/A"}
          </span>
          <button
            className="text-white bg-red-500 rounded-full px-4 py-1 font-semibold hover:bg-red-600 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
