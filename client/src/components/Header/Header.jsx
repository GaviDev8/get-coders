import { Link, useLocation } from "react-router-dom";
import GetCodersLogo from "../../assets/images/mainlogo.svg";
import "./Header.css";
import { useHistory } from "react-router-dom"; // Import useHistory for redirecting after logout

function Header() {
  const currentPage = useLocation().pathname;
  const history = useHistory(); // Initialize useHistory

  const handleLogout = () => {
    // Perform logout actions here, such as removing token from local storage
    localStorage.removeItem('token');
    // Redirect to login page or any other desired location after logout
    history.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img className="header-logo" src={GetCodersLogo} alt="Get Coders Logo" width="100" height="75"/>
        </a>
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
            <li className="nav-item">
              <Link className="link" to="/"><span style={{ color: currentPage === '/' ? '#2e94b9' : '#475053' }}>Home</span></Link>
            </li>
            <li className="nav-item">
              <Link className="link" to="/profile"><span style={{ color: currentPage === '/profile' ? '#2e94b9' : '#475053' }}>Profile</span></Link>
            </li>
            <li className="nav-item">
              <Link className="link" to="/jobs"><span style={{ color: currentPage === '/jobs' ? '#2e94b9' : '#475053' }}>Jobs</span></Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;

