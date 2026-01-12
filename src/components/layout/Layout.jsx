import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import Loader from "../loader/Loader.jsx";
import { Link } from "react-router-dom";
import ProfileModal from "./ProfileModel.jsx";

const Layout = ({ children }) => {
  const [showProfile, setShowProfile] = useState(false);

  const { user, isLoading } = useAuth();

  const isAuthenticated = !!user?.data;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white px-4 ">
        {isLoading && <Loader />}
        <div className="flex items-center justify-between pt-4 pb-10">
          {/* 🔷 Logo */}
          <Link to={"/"}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-400/30 p-1">
                <img src="/symbol.svg" alt="logo" />
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight">
                Short<span className="text-cyan-400">Link</span>
              </span>
            </div>
          </Link>

          {/* 🔝 Auth Section */}
          {!isLoading && (
            <>
              {/* ❌ Guest */}
              {!isAuthenticated && (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg border border-white/20 text-sm text-white hover:bg-white/10 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 whitespace-nowrap rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition shadow-md shadow-cyan-400/30"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {isAuthenticated && (
                <button
                  onClick={() => setShowProfile(true)}
                  className="w-10 h-10 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold shadow-lg shadow-cyan-400/30 hover:scale-105 transition"
                >
                  {user.data.name.charAt(0).toUpperCase()}
                </button>
              )}
            </>
          )}

          {showProfile && (
            <ProfileModal onClose={() => setShowProfile(false)} />
          )}
        </div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
