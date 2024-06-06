import { Link, useLocation, useNavigate } from "react-router-dom";
import GetCodersLogo from "../../assets/images/mainlogo.svg";
import "./Header.css";

function Header() {
    const currentPage = useLocation().pathname;
    const navigate = useNavigate();
    const handleLogout = () => {
    // Perform logout actions here, such as removing token from local storage
    localStorage.removeItem('token');
    // Redirect to login page or any other desired location after logout
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between">
         <a className="navbar-brand" href="#">
          <img className="header-logo mx-5" src={GetCodersLogo} alt="Get Coders Logo" width="100" height="75"/>
        </a>
      <div>
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
          <ul className="navbar-nav">
            <li className="nav-item px-3">
              <Link className={currentPage === '/' ? "active-link link": "link"} to="/">Home</Link>
            </li>
            <li className="nav-item px-3">
              <Link className={currentPage === '/profile' ? "active-link link": "link"} to="/profile">Profile</Link>
            </li>
            <li className="nav-item px-3">
              <Link className={currentPage === '/jobs' ? "active-link link": "link"} to="/jobs">Jobs</Link>
            </li>
          </ul>
        </div>
      </div>
      <button className="btn btn-outline-danger mx-5" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Header;

