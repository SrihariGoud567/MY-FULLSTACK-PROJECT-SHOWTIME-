import { Link } from "react-router-dom";

function Sidebar({ open, setOpen, user, handleLogout }) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity z-40 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-black border-l border-yellow-500/40 shadow-[0_0_40px_#eab308]
        transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 space-y-6">

          <h2 className="text-yellow-400 text-xl font-bold border-b border-yellow-500/30 pb-3">
            Menu
          </h2>

          <Link
            to="/bookings"
            onClick={() => setOpen(false)}
            className="block text-yellow-400 font-semibold hover:underline"
          >
            Booking History
          </Link>

          {user && (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="text-red-400 font-semibold hover:underline"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </>
  );
}

export default Sidebar;

