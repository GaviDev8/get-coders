import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import AuthService from "../../utils/auth";

function Header() {
  const currentPage = useLocation().pathname;
  const isLoggedIn = AuthService.loggedIn();

  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
        <span id="getCoders">Get &#123; Coders &#125;</span>
      <div className="navbar-nav-wrapper">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> 
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            {!isLoggedIn && (
              <li className="nav-item px-3">
                <Link className={currentPage === '/' ? "active-link link" : "link"} to="/">Home</Link>
              </li>
            )}
            <li className="nav-item px-3">
              <Link className={currentPage === '/profile' ? "active-link link" : "link"} to="/profile">Profile</Link>
            </li>
            <li className="nav-item px-3">
              <Link className={currentPage === '/jobs' ? "active-link link" : "link"} to="/jobs">Jobs</Link>
            </li>
          </ul>
        </div>
      </div>
      {isLoggedIn && (
        <button className="btn btn-outline-danger mx-5" onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
}

export default Header;
