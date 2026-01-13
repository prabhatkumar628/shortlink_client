import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../layout/Layout.jsx";
import { useLogin, useMe } from "../../../hooks/useAuth.js";
import Loader from "../../loader/Loader.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigater = useNavigate();
  const { mutate: login, isPending, isError, error } = useLogin();
  const { data } = useMe();

  useEffect(() => {
    if (data?.data !== null) {
      navigater("/");
    }
  }, [data, navigater]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          navigater("/");
        },
      }
    );
  };

  return (
    <Layout>
      {isPending && <Loader />}
      <div className="min-h-[calc(100dvh-200px)] w-full grid place-items-center">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 rounded bg-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-400/30 p-1">
              <img src="/symbol.svg" alt="logo" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-center mb-6">
            Login to manage your short links
          </p>

          {isError && (
            <p className="text-red-500 text-sm">
              {error?.response?.data?.message || "Something went wrong"}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none text-white"
            />

            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl px-4 py-3 bg-black/40 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none text-white"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition shadow-md shadow-cyan-400/30"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-cyan-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
