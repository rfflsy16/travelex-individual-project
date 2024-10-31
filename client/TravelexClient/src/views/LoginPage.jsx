import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage({ base_url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const body = { email, password };
      const { data } = await axios.post(`${base_url}/user/login`, body);
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function googleLogin(codeResponse) {
    try {
      const { data } = await axios.post(`${base_url}/user/google/login`, null, {
        headers: { token: codeResponse.credential },
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
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
            src="https://media.giphy.com/media/opvm3FXT2qYus/giphy.gif?cid=ecf05e470zh0avvhs7ohxcjuisjy3smg398j74ggaanqr581&ep=v1_gifs_related&rid=giphy.gif&ct=s"
            alt="Travel GIF"
          />
        </div>
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-b from-gray-100 to-gray-50 shadow-inner rounded-r-lg">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-6">
            Welcome Back!
          </h2>
          <form className="space-y-6" onSubmit={login}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
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
                id="password"
                name="password"
                type="password"
                required
                className="input input-bordered w-full bg-gray-100 text-gray-900 rounded-lg shadow-md focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-teal-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold shadow-lg rounded-lg transform hover:scale-105 transition-all duration-300"
            >
              Sign in
            </button>
          </form>
          <div className="divider px-10">OR</div>
          <GoogleLogin onSuccess={googleLogin} />

          {/* Tautan ke halaman register */}
          <p className="text-gray-600 mt-6 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-teal-700 font-semibold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
