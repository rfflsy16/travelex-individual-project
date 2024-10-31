function WishlistCard({ userId, destinationId, category, status }) {
  return (
    <div className="card w-80 bg-base-100 shadow-lg m-4">
      <div className="card-body">
        <h3 className="card-title">Wishlist Item</h3>
        <p className="text-sm text-gray-500">
          <strong>User ID:</strong> {userId}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Destination ID:</strong> {destinationId}
        </p>
        <p className="text-sm">
          <strong>Category:</strong> {category}
        </p>
        <p className="text-sm">
          <strong>Status:</strong> {status}
        </p>
        <div className="card-actions justify-end mt-4">
          <span
            className={`badge ${
              status === "Planned" ? "badge-info" : "badge-success"
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
