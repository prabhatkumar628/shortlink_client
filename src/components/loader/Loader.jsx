import "./loader.css"

export default function Loader({ text = "Loading" }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-cyan-400/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin shadow-lg shadow-cyan-400/40"></div>

          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-xl bg-cyan-400 flex items-center justify-center">
              <span className="text-black font-extrabold text-lg">S</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <p className="text-cyan-400 font-medium tracking-wide text-sm">
          {text}
          <span className="animate-pulse">...</span>
        </p>
      </div>
    </div>
  );
}
