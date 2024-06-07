import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function About() {
  // Array of profile data
  const profiles = [
    {
      name: "Erik Gontijo",
      title: "Programmer",
      github: "https://github.com/Erikrainer",
      linkedin: "https://www.linkedin.com/in/erik-gontijo-05950a2bb/",
    },
    {
      name: "Gabriela Ortiz",
      title: "Programmer",
      github: "https://github.com/GaviDev8",
      linkedin: "https://www.linkedin.com/in/gabrielaortizz/",
    },
    {
      name: "Gordon Eden",
      title: "Programmer",
      github: "https://github.com/G-code117",
      linkedin: "https://www.linkedin.com/in/",
    },
    {
      name: "Connor Goaring",
      title: "Programmer",
      github: "https://github.com/CoGoaring",
      linkedin: "https://www.linkedin.com/in/",
    },
  ];

  return (
    <>
    <div className="my-5"></div>
    <Container fluid>
      {/* Title for the team */}
      <Row className="justify-content-center my-4">
        <Col>
          <h2 className="text-center">The Team</h2>
        </Col>
      </Row>
      {/* Blurb about the founders */}
      <Row>
        <Col>
       We're not just a team; we're a community of dedicated coders driven by a shared passion for empowerment and growth.
       Our mission is to provide a platform where fellow developers can gain invaluable experience and discover exciting contracting opportunities.
       Explore our journey, join our community, and embark on your coding adventure with us.
        </Col>
      </Row>
      </Container>
      {/* founders cards begin */}
      <section className="vh-100" style={{ marginBottom: "1px" }}> {/* Adjust margin-bottom here to reduce space between footer */}
        <Container className="py-5 d-flex justify-content-center align-items-center">
          <Row className="justify-content-center">
            {profiles.map((profile, index) => (
              <Col key={index} md={6} lg={3}>
                <Card style={{ borderRadius: "15px", width: "100%", height: "300px" }}>
                  <Card.Body className="text-center d-flex flex-column justify-content-between">
                    <div className="mt-3 mb-4">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                        className="rounded-circle img-fluid"
                        style={{ width: "100px" }}
                        alt="Profile Avatar"
                      />
                    </div>
                    <div>
                      <h4 className="mb-2">{profile.name}</h4>
                      <p className="text-muted mb-4" title={profile.title}>{profile.title}</p>
                      <div className="mb-4">
                        <a href={profile.github} target="_blank" rel="noopener noreferrer">
                          <FaGithub className="me-3" size={30} />
                        </a>
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                          <FaLinkedin className="me-3" size={30} />
                        </a>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default About;