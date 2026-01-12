import conf from "../conf/conf.js";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    let guestId = localStorage.getItem(conf.STORAGE_KEY);

    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/auth/google?guestId=${guestId}`;
  };

  return (
    <div
      onClick={handleGoogleLogin}
      className="w-full sm:w-auto mt-4 flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="google"
        className="w-5 h-5"
      />
      Continue with Google
    </div>
  );
};

export default GoogleLoginButton;
