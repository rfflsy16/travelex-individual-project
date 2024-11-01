import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register({ base_url }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    try {
      const body = { username, email, password };
      const { data } = await axios.post(`${base_url}/user/register`, body);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-200 via-teal-100 to-green-300">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl transition-all transform hover:scale-105 hover:shadow-3xl duration-500">
        <div className="w-full md:w-1/2 p-6">
          <img
            className="w-full h-full object-cover rounded-l-lg"
            src="https://media.giphy.com/media/9D1ZLMyr99fI7bWJy0/giphy.gif?cid=ecf05e47oax13725350k5qazk171l5ldi7nhcrnjdz0155mn&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Nature"
          />
        </div>
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-b from-gray-100 to-gray-50 shadow-inner rounded-r-lg">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-6">
            Join Travelex!
          </h2>
          <form onSubmit={register} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="username"
                required
                className="input input-bordered w-full bg-gray-100 text-gray-900 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="input input-bordered w-full bg-gray-100 text-gray-900 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className="input input-bordered w-full bg-gray-100 text-gray-900 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-teal-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold shadow-lg rounded-lg transform hover:scale-105 transition-all duration-300"
            >
              Register
            </button>
          </form>
          <p className="text-gray-600 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-700 font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
