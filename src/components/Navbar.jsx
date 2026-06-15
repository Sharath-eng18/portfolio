import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav>
        <NavLink className="nav-logo hoverable" to="/" onClick={closeMenu}>
          SHARATH<span>.AI</span>
        </NavLink>

        {/* Desktop links */}
        <div className="nav-links">
          <NavLink
            className={({ isActive }) =>
              `hoverable${isActive ? " nav-active" : ""}`
            }
            to="/"
            end
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `hoverable${isActive ? " nav-active" : ""}`
            }
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `hoverable${isActive ? " nav-active" : ""}`
            }
            to="/projects"
          >
            Projects
          </NavLink>
        </div>

        <a
          className="nav-cta hoverable"
          href="https://instagram.com/sharath_018"
          target="_blank"
          rel="noopener noreferrer"
        >
          @sharath_018 ↗
        </a>

        {/* Mobile menu toggle */}
        <button
          className={`nav-toggle hoverable ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
          <span className="toggle-bar"></span>
        </button>
      </nav>

      {/* Mobile nav overlay */}
      <div className={`mobile-nav-overlay ${isOpen ? "open" : ""}`}>
        <div className="mobile-nav-links">
          <NavLink
            className={({ isActive }) =>
              `mobile-nav-link hoverable${isActive ? " active" : ""}`
            }
            to="/"
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `mobile-nav-link hoverable${isActive ? " active" : ""}`
            }
            to="/about"
            onClick={closeMenu}
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `mobile-nav-link hoverable${isActive ? " active" : ""}`
            }
            to="/projects"
            onClick={closeMenu}
          >
            Projects
          </NavLink>
          <a
            className="mobile-nav-cta hoverable"
            href="https://instagram.com/sharath_018"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            @sharath_018 ↗
          </a>
        </div>
      </div>
    </>
  );
}
