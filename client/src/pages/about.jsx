import React from "react";
import { FaGithub, FaLinkedin, FaAddressCard } from 'react-icons/fa';
import person from "../assets/images/person.jpg"
// import "./AboutPage.css";

function About() {
  return (
    <div className="container text-center" id="aboutContainer">
      <p className="mt-5 fw-bold" id="aboutText">
      Meet our founders! We're a team of passionate coders committed to helping others gain experience and find contracting gigs. Ambitious? Absolutely. 
      Below, you'll find the tech stack we used to craft this site.
      </p>
      {/* Skills begin */}
      <section id="skillSection" className="container text-left">
      <div className="row">
        <div className="col-md-6">
          <h2 id="skillTitle">HTML & CSS</h2>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '90%' }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        <div className="col-md-6">
          <h2 id="skillTitle">MongoDB</h2>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '80%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <h2 id="skillTitle">JavaScript</h2>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '95%' }} aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        <div className="col-md-6">
          <h2 id="skillTitle">React</h2>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '90%' }} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <h2 id="skillTitle">Express JS</h2>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '85%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
        <div className="col-md-6">
          <h2 id="skillTitle">Node JS</h2>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: '90%' }} aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </section>
    <h1 className="fw-lighter mt-5 text-uppercase">
        Contact Us <FaAddressCard size={30} style={{ color: 'white' }} />
      </h1>
    {/* Founders contact info */}
      <section className="founders-section mt-5">
      <div className="d-flex justify-content-center flex-wrap">
        <div className="card founder-card m-3 l-bg-blue-dark" id="founderCard">
          <img src={person} className="card-img-top" alt="Erik" style={{ width: '275px', height: 'auto' }}/>
          <div className="card-body">
            <h2 className="card-title">Erik Gontijo</h2>
            <a className="m-4" id="icons" href="https://github.com/Erikrainer" target="_blank" rel="noopener noreferrer">
      <FaGithub size={15} style={{ color: '#2e94b9' }} /></a>
      <a className="m-4" id="icons" href="https://www.linkedin.com/in/erik-gontijo-05950a2bb/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin size={15} style={{ color: '#2e94b9' }} /></a>
          </div>
        </div>
        <div className="card founder-card m-3 l-bg-blue-dark" id="founderCard">
          <img src={person} className="card-img-top" alt="Gabriela" style={{ width: '275px', height: 'auto' }}/>
          <div className="card-body">
            <h2 className="card-title">Gabriela Ortiz</h2>
            <a className="m-4" id="icons" href="https://github.com/GaviDev8" target="_blank" rel="noopener noreferrer">
      <FaGithub size={15} style={{ color: '#2e94b9' }} /></a>
      <a className="m-4" id="icons" href="https://www.linkedin.com/in/gabrielaortizz/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin size={15} style={{ color: '#2e94b9' }} /></a>
      </div>
        </div>
        <div className="card founder-card m-3 l-bg-blue-dark" id="founderCard">
          <img src={person} className="card-img-top" alt="Gordon" style={{ width: '275px', height: 'auto' }}/>
          <div className="card-body">
            <h2 className="card-title">Gordon Eden</h2>
            <a className="m-4" id="icons" href="https://github.com/G-code117" target="_blank" rel="noopener noreferrer">
      <FaGithub size={15} style={{ color: '#2e94b9' }} /></a>
      <a className="m-4" id="icons" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin size={15} style={{ color: '#2e94b9' }} /></a>
          </div>
        </div>
        <div className="card founder-card m-3 l-bg-blue-dark" id="founderCard">
          <img src={person} className="card-img-top" alt="Connor" style={{ width: '275px', height: 'auto' }}/>
          <div className="card-body">
            <h2 className="card-title">Connor Goaring</h2>
            <a className="m-4" id="icons" href="https://github.com/CoGoaring" target="_blank" rel="noopener noreferrer">
      <FaGithub size={15} style={{ color: '#2e94b9' }} /></a>
      <a className="m-4" id="icons" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin size={15} style={{ color: '#2e94b9' }} /></a>
          </div>
        </div>
      </div>
    </section>
    {/* end */}
    </div>
  );
}

export default About;