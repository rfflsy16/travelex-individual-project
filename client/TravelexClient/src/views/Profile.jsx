import { useState, useEffect } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useParams, useNavigate } from "react-router-dom";

export default function Profile({ base_url }) {
  const { id } = useParams();
  const [imgUrl, setImgUrl] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  async function fetchUserProfile() {
    try {
      const { data } = await axios.get(`${base_url}/user/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setImgUrl(data.imgUrl);
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  }

  async function handleImageSelect(event) {
    const file = event.target.files[0];
    setImageUpload(file);
    if (file) {
      setImgUrl(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!imageUpload) {
      Toastify({
        text: "Please select an image to upload.",
        backgroundColor: "#FF0000",
        duration: 3000,
      }).showToast();
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("imgUrl", imageUpload);

      const { data } = await axios.patch(
        `${base_url}/user/profile/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Toastify({
        text: `${data.message}`,
        backgroundColor: "#008000",
        duration: 3000,
      }).showToast();

      setImgUrl(data.imgUrl);
      navigate("/");
    } catch (error) {
      console.error("Error uploading image:", error);

      const errorMessage =
        error.response?.data?.error || "Failed to upload image.";
      Toastify({
        text: errorMessage,
        backgroundColor: "#FF0000",
        duration: 3000,
      }).showToast();
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-200 via-blue-200 to-purple-200">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Upload Profile Picture
        </h1>
        <img
          src={imgUrl || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 mx-auto rounded-full shadow-lg mb-6 object-cover"
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="file-input file-input-bordered w-full bg-gray-100"
          />
          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-md transform hover:scale-105"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Save Image"}
          </button>
        </form>
        {uploading && (
          <div className="flex gap-2 items-center justify-center mt-4">
            <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full border-t-blue-600"></div>
            <p className="text-gray-600">Uploading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
