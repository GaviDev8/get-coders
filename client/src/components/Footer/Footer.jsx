// import "./style.css";
import { FaGithub, FaHome, FaAddressCard } from 'react-icons/fa';

function simpleFooter() {
  return (
    <div className="text-center footer">

       <a className="m-4" id="icons" href="/" target="_blank" rel="noopener noreferrer">
      <FaHome size={25} style={{ color: '#2e94b9' }} />
      </a>
      <a className="m-4" id="icons" href="https://github.com/GaviDev8/get-coders" target="_blank" rel="noopener noreferrer">
      <FaGithub size={25} style={{ color: '#2e94b9' }} />
      </a>
      <a className="m-4" id="icons" href="/about" target="_blank" rel="noopener noreferrer">
      <FaAddressCard size={25} style={{ color: '#2e94b9' }} />
      </a>
      <h2 className="fs-4" id="footerText">&copy; Get Coders 2024</h2>
    </div>
  );
}

export default simpleFooter;
