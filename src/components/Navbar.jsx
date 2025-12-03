import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 text-white rounded-sm flex items-center justify-center font-bold">AI</div>
          <div className="font-semibold text-lg">maBetter</div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          <Link
            to="/"
            className={`tab ${
              loc.pathname === "/" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-600"
            }`}
          >
            Create Flashcard
          </Link>

          <Link
            to="/my-flashcards"
            className={`tab ${
              loc.pathname === "/my-flashcards"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            My Flashcards
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <nav className="flex flex-col px-6 py-4 gap-4">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className={`tab ${
                loc.pathname === "/"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Create Flashcard
            </Link>

            <Link
              to="/my-flashcards"
              onClick={() => setOpen(false)}
              className={`tab ${
                loc.pathname === "/my-flashcards"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              My Flashcards
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
