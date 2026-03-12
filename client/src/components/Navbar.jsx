import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({
  onSearch = () => {},
  showSearch = true,
  actionLabel,
  onActionClick,
}) {
  const [search, setSearch] = useState("");
  const [logoSrc, setLogoSrc] = useState("/design-sans-titre.png");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <header className="fixed left-1/2 top-6 z-30 w-[92%] max-w-6xl -translate-x-1/2">
      <div className="rounded-full border border-white/40 bg-white/20 px-4 py-3 shadow-lg backdrop-blur-md sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logoSrc}
              alt="Reservation Doctor logo"
              onError={() => setLogoSrc("/Design sans titre.png")}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-sm font-semibold tracking-wide text-slate-800 sm:text-base">
              Reservation Doctor
            </span>
          </div>

          <div className="flex items-center gap-5 text-sm font-medium text-slate-700">
            <Link to="/" className="transition hover:text-slate-900">
              Home
            </Link>
            <Link to="/doctors" className="transition hover:text-slate-900">
              Doctors
            </Link>
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            {showSearch && (
              <form onSubmit={handleSearch} className="flex w-full gap-2 sm:w-auto">
                <input
                  type="text"
                  placeholder="Search specialty..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-white/50 bg-white/70 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-cyan-300 sm:w-56"
                />

                <button
                  type="submit"
                  className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                >
                  Search
                </button>
              </form>
            )}

            {actionLabel && (
              <button
                type="button"
                onClick={onActionClick}
                className="rounded-xl border border-white/50 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white"
              >
                {actionLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
