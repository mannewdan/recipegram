import logo from "../assets/Recipegram.svg";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const path = useLocation().pathname;

  return (
    <div className="sidebar-container">
      <nav className="sidebar">
        <Link to="/">
          <div className="sidebar__logo-container">
            <img className="logo" src={logo}></img>
          </div>
        </Link>

        <div className="sidebar__link-container">
          <Link
            className={`sidebar__link ${path === "/" ? "active" : ""}`}
            to="/"
          >
            <div className="sidebar__link--icon-holder">
              <i className="fa-solid fa-house"></i>
            </div>
            <span>Home</span>
          </Link>
          <Link
            className={`sidebar__link ${path === "/search" ? "active" : ""}`}
            to="/search"
          >
            <div className="sidebar__link--icon-holder">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <span>Search</span>
          </Link>
          <Link
            className={`sidebar__link ${path === "/favorites" ? "active" : ""}`}
            to="/favorites"
          >
            <div className="sidebar__link--icon-holder">
              <i className="fa-solid fa-star"></i>
            </div>
            <span>My Favorites</span>
          </Link>
          <Link
            className={`sidebar__link ${path === "/history" ? "active" : ""}`}
            to="/history"
          >
            <div className="sidebar__link--icon-holder">
              <i className="fa-solid fa-book"></i>
            </div>
            <span>My History</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
