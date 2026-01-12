import React, { useState } from "react";
import { useCreateUrl, useGetUrls } from "../../hooks/useUrl.js";
import { Link } from "react-router-dom";
import { FiCopy, FiCheck, FiExternalLink } from "react-icons/fi";
import Layout from "../layout/Layout.jsx";
import Loader from "../loader/Loader.jsx";
import { useAuth } from "../../context/AuthContext.js";
import { HiOutlineChartBar } from "react-icons/hi2";
import { FiX } from "react-icons/fi";

export default function ShortUrlHome() {
  const [urlName, setUrlName] = useState("");
  const [copied, setCopied] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);

  const { user, isLoading } = useAuth();
  const isAuthenticated = !!user?.data;

  const { data } = useGetUrls();
  const { mutate, isPending, isError, error } = useCreateUrl();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { urlName },
      {
        onSuccess: () => {
          setUrlName("");
        },
      }
    );
  };

  return (
    <>
      <Layout>
        {isPending && <Loader />}
        <div className="flex items-center justify-center ">
          <div className="w-full max-w-3xl">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                Shorten Your <span className="text-cyan-400">Long URLs</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Simple, fast and secure URL shortener for your links
              </p>
            </div>

            {/* Google Login (commented as asked) */}
            {/*
          {isGuest && (
            <div className="flex justify-center w-full my-6">
              <GoogleLoginButton />
            </div>
          )}
          */}

            {/* Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8">
              {isError && (
                <p className="text-red-500 text-sm">
                  {error?.response?.data?.message || "Something went wrong"}
                </p>
              )}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4"
              >
                <input
                  type="url"
                  placeholder="Paste your long URL here..."
                  value={urlName}
                  onChange={(e) => setUrlName(e.target.value)}
                  required
                  className="flex-1 rounded-xl px-5 py-4 bg-black/40 border border-white/10 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none text-white placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="rounded-xl px-8 py-4 font-semibold bg-cyan-400 text-black hover:bg-cyan-300 transition-all duration-200 shadow-lg shadow-cyan-400/30"
                >
                  Shorten URL
                </button>
              </form>

              {/* ❗ Ye comment bilkul nahi hataya */}
              <div className="mt-6 text-sm text-gray-400 text-center">
                By clicking <span className="text-white">Shorten URL</span>, you
                agree to our
                <span className="text-cyan-400"> Terms</span> &
                <span className="text-cyan-400"> Privacy Policy</span>
              </div>
            </div>

            {data &&
              data.data !== 0 &&
              data.data.map((data) => {
                const shortUrl = `${window.location.origin}/${data.urlKey}`;
                return (
                  <div
                    key={data._id}
                    className="mt-6 bg-black/40 border border-white/10 rounded-xl p-4 grid grid-cols-12 items-center gap-4"
                  >
                    {/* Short URL */}
                    <div className="col-span-12 sm:col-span-6">
                      <div className="flex-1 text-cyan-400 font-medium break-all">
                        <span className="text-white">Short Link: </span>{" "}
                        {shortUrl}
                      </div>
                      <div className="flex-1 text-cyan-400 font-medium break-all">
                        <span className="text-white">Full Link: </span>{" "}
                        {data.urlName}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-12 sm:col-span-6 flex items-center justify-center gap-3">
                      {/* Copy Button */}
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(shortUrl);
                          setCopied(shortUrl);
                          setTimeout(() => setCopied(null), 1500);
                        }}
                        className={`flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg text-sm font-semibold transition
                                  ${
                                    copied === shortUrl
                                      ? "bg-green-500 text-black"
                                      : "bg-cyan-400 text-black hover:bg-cyan-300"
                                  }`}
                      >
                        {copied === shortUrl ? (
                          <>
                            <FiCheck className="text-base" />
                            Copied
                          </>
                        ) : (
                          <>
                            <FiCopy className="text-base" />
                            Copy
                          </>
                        )}
                      </button>

                      {/* Redirect Button */}
                      <Link
                        to={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg border border-white/20 text-sm font-semibold text-white hover:bg-white/10 transition"
                      >
                        <FiExternalLink className="text-base" />
                        Open
                      </Link>

                      {!isLoading && isAuthenticated && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedUrl(data); // 👈 current row ka data
                              setOpen(true);
                            }}
                            className="flex items-center gap-2 px-2 sm:px-4 py-2 rounded-lg
                               border border-white/20 text-sm font-semibold text-white
                               bg-white/5 hover:bg-white/10 backdrop-blur-md
                               transition-all duration-200"
                          >
                            <HiOutlineChartBar className="text-cyan-400 text-lg" />
                            Track
                          </button>
                          {open && (
                            <TrackModal
                              open={open}
                              onClose={() => setOpen(false)}
                              selectedUrl={selectedUrl}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <h3 className="text-lg font-semibold mb-2 text-cyan-400">
                  Fast
                </h3>
                <p className="text-gray-400 text-sm">
                  Generate short links instantly with blazing speed
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <h3 className="text-lg font-semibold mb-2 text-cyan-400">
                  Secure
                </h3>
                <p className="text-gray-400 text-sm">
                  Your links are safe with modern security standards
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                <h3 className="text-lg font-semibold mb-2 text-cyan-400">
                  Analytics
                </h3>
                <p className="text-gray-400 text-sm">
                  Track clicks and performance of your short URLs
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-12 text-gray-500 text-sm">
              © {new Date().getFullYear()} ShortLink. All rights reserved.
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

const TrackModal = ({ open, onClose, selectedUrl }) => {
  const shortUrl = `${window.location.origin}/${selectedUrl.urlKey}`;

  if (!open) return null;

  return (
    <div className="fixed inset-0 top-0 left-0 w-screen h-screen overflow-hidden z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl bg-[#0b1220] border border-white/10 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Link Analytics</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <FiX size={30} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-sm text-white/80">
          <Info label="Short Link: " value={` ${shortUrl}`} />
          <Info label="Full Link: " value={` ${selectedUrl.urlName}`} />
          <Info
            label="Created At"
            value={new Date(selectedUrl.createdAt).toLocaleString()}
          />
          <Info label="Total Clicks" value={selectedUrl.clickHistory.length} />

          {/* Last Click */}
          <div className="overflow-y-auto max-h-[44vh] scrollbar-hide">
            {selectedUrl.clickHistory.length > 0 &&
              selectedUrl.clickHistory.map((history) => {
                const formatDate = (date) =>
                  new Date(date).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  });

                return (
                  <div className="mt-4 rounded-lg grid grid-cols-2 gap-3 bg-white/5 p-4 border border-white/10 text-sm">
                    <p>
                      <span className="text-gray-400">Browser:</span>{" "}
                      {history.browser}
                    </p>
                    <p>
                      <span className="text-gray-400">OS:</span> {history.os}
                    </p>

                    <p>
                      <span className="text-gray-400">Device:</span>{" "}
                      {history.device}
                    </p>
                    <p>
                      <span className="text-gray-400">IP:</span> {history.ip}
                    </p>

                    <p>
                      <span className="text-gray-400">Country:</span>{" "}
                      {history.country}
                    </p>
                    <p>
                      <span className="text-gray-400">City:</span>{" "}
                      {history.city}
                    </p>

                    <p className="col-span-2">
                      <span className="text-gray-400">Time:</span>{" "}
                      {formatDate(history.time)}
                    </p>

                    <p className="col-span-2 break-all">
                      <span className="text-gray-400">User Agent:</span>{" "}
                      {history.userAgent}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex justify-end">
          <button className="px-4 py-2 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition">
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-white/50 whitespace-nowrap">{label}</span>
    <span className="text-white wrap-anywhere">{value}</span>
  </div>
);
