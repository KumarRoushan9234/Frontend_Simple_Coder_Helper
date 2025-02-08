import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const { authUser, signup } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signup(
        credentials.name,
        credentials.email,
        credentials.username, // Ensure username is included
        credentials.password
      );

      console.log("Signup Response:", result); // Log the response

      if (result.success) {
        toast.success("Signup successful! Redirecting...");
        navigate("/login");
      } else {
        toast.error(result.message || "Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Signup failed.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={credentials.email}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={credentials.name}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 font-medium hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
