// import "./style.css";
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

function simpleFooter() {
  return (
    <div className="text-center footer">
       <a className="m-4" id="icons" href="https://www.linkedin.com/in/erik-gontijo-05950a2bb/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin size={25} style={{ color: '#2e94b9' }} />
      </a>
      <a className="m-4" id="icons" href="https://github.com/Erikrainer" target="_blank" rel="noopener noreferrer">
      <FaGithub size={25} style={{ color: '#2e94b9' }} />
      </a>
      <a className="m-4" id="icons" href="https://www.instagram.com/erikgontijo/" target="_blank" rel="noopener noreferrer">
      <FaInstagram size={25} style={{ color: '#2e94b9' }} />
      </a>
      <h2 className="fs-4" id="footerText">&copy; Get Coders 2024</h2>
    </div>
  );
}

export default simpleFooter;
