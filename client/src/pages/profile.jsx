import { useMutation } from "@apollo/client";
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

function Profile() {
  const [textBoxValue, setTextBoxValue] = useState('');
  const [languages, setLanguages] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [skills, setSkills] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <section className="d-flex">
      <div className="w-50">
        {/* Text box */}
        <Form>
          <Form.Group controlId="textBox">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter text here"
              value={textBoxValue}
              onChange={(e) => setTextBoxValue(e.target.value)}
            />
          </Form.Group>
        </Form>
        {/* Text entered */}
        <p>Entered Text: {textBoxValue}</p>
      </div>
      <div className="w-50">
        <Button variant="primary" onClick={handleShow}>
          Add your profile qualities
        </Button>
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Skills</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formLanguages">
                <Form.Label>Choose your languages 💻</Form.Label>
                <Form.Select value={languages} onChange={(e) => setLanguages(e.target.value)}>
                  <option value="">Choose...</option>
                  <option value="HTML">HTML</option>
                  <option value="CSS">CSS</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formTechnologies">
                <Form.Label>Choose your tech stack 🍔</Form.Label>
                <Form.Select value={technologies} onChange={(e) => setTechnologies(e.target.value)}>
                  <option value="">Choose...</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="React">React</option>
                  <option value="Node.js">Node.js</option>
                  <option value="SASS">SASS</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formSkills">
                <Form.Label>Choose your skills 🛠️</Form.Label>
                <Form.Select value={skills} onChange={(e) => setSkills(e.target.value)}>
                  <option value="">Choose...</option>
                  <option value="Project Management">Project Management</option>
                  <option value="Risk Management">Risk Management</option>
                  <option value="Strategic">Strategic</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Display selected options */}
        <div>
          <p>Selected Languages: {languages}</p>
          <p>Selected Technologies: {technologies}</p>
          <p>Selected Skills: {skills}</p>
        </div>
      </div>
    </section>
  );
}

export default Profile;



