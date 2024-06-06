// import "./style.css";
import { FaGithub, FaHome, FaAddressCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function simpleFooter() {
  return (
    <div className="text-center footer">

       <Link className="m-4" id="icons" to="/" rel="noopener noreferrer">
      <FaHome size={25} style={{ color: 'white' }} />
      </Link>
      <a className="m-4" id="icons" href="https://github.com/GaviDev8/get-coders" target="_blank" rel="noopener noreferrer">
      <FaGithub size={25} style={{ color: 'white' }} />
      </a>
      <a className="m-4" id="icons" href="/about" target="_blank" rel="noopener noreferrer">
      <FaAddressCard size={25} style={{ color: 'white' }} />
      </a>
      <h2 className="fs-6" id="footerText" style={{ color: 'white' }}>&copy; Get Coders 2024</h2>
    </div>
  );
}

export default simpleFooter;
