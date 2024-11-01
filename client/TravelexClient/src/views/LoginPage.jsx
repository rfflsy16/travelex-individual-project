import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { login, googleLogin } from "../redux/slices/loginSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.user);

  async function handleLogin(e) {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      navigate("/");
    } else {
      console.error("Login failed:", result.payload);
    }
  }

  async function handleGoogleLogin(codeResponse) {
    const result = await dispatch(googleLogin(codeResponse));
    if (googleLogin.fulfilled.match(result)) {
      navigate("/");
    } else {
      console.error("Google login failed:", result.payload);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-200 via-teal-100 to-green-300">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl transition-all transform hover:scale-105 hover:shadow-3xl duration-500">
        <div className="w-full md:w-1/2 p-6">
          <img
            className="w-full h-full object-cover rounded-l-lg"
            src="https://media.giphy.com/media/u4BVHMmwHuvU2B722I/giphy.gif?cid=ecf05e47hwini2u15g8oj6p2sikt4eqmij9eh4d4dgdg5vcd&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            alt="Travel GIF"
          />
        </div>
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-b from-gray-100 to-gray-50 shadow-inner rounded-r-lg">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-6">
            Welcome Back!
          </h2>
          <form className="space-y-6" onSubmit={handleLogin}>
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
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign in"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          <div className="divider px-10">OR</div>
          <GoogleLogin onSuccess={handleGoogleLogin} />

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
