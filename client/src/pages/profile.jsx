import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ADD_LANGUAGE, ADD_SKILL, ADD_TECH } from '../utils/mutations';
import './Profile.css';

function Profile() {
  const [textBoxValue, setTextBoxValue] = useState('');
  const [languages, setLanguages] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  
  const languageArray = [
    "HTML",
    "CSS",
    "Python",
    "Java",
    "C#",
    "C++",
    "Go",
    "SQL",
    "R",
  ];
  const technologiesArray = [
    "Express",
    "Node.js",
    "MongoDB",
    "Django",
    "Handlebars",
    "GraphQL",
    "Apollo",
    "API",
    "UX Design",

  ];
  const skillsArray = [
    "Project Management",
    "Risk Management",
    "Strategic Planning",
    "Bilingual",
    "High EQ",
    "Empathetic",
    "Collaborative",
    "Adaptability",
  ];
   // pull erik's mutations
   const [addLanguage] = useMutation(ADD_LANGUAGE);
   const [addSkill] = useMutation(ADD_SKILL);
   const [addTech] = useMutation(ADD_TECH);

   // checkboxes
   const handleLanguageCheckbox = (checked, id) => {
    console.log(checked, id)
    
    if (checked) {
      setLanguages((previous)=> [...previous, id])
    }
    else {
      const currentLanguages = [...languages]
      const index = currentLanguages.indexOf(id)
      if (index !== -1 ) {
        currentLanguages.splice(index, 1)
        setLanguages(currentLanguages)
      }
    }
   };

   const handleTechCheckbox = (checked, id) => {
    console.log(checked, id)
    
    if (checked) {
      setTechnologies((previous)=> [...previous, id])
    }
    else {
      const currentTechnologies = [...technologies]
      const index = currentTechnologies.indexOf(id)
      if (index !== -1 ) {
        currentTechnologies.splice(index, 1)
        setTechnologies(currentTechnologies)
      }
    }
   };

   const handleSkillsCheckbox = (checked, id) => {
    console.log(checked, id)
    
    if (checked) {
      setSkills((previous)=> [...previous, id])
    }
    else {
      const currentSkills = [...languages]
      const index = currentSkills.indexOf(id)
      if (index !== -1 ) {
        currentSkills.splice(index, 1)
        setSkills(currentSkills)
      }
    }
   };

   const handleSaveChanges = () => {
     addLanguage({ variables: { language: languages } });
     addSkill({ variables: { skill: skills } });
     addTech({ variables: { technology: technologies } });
 
     // Close modal
     console.log(languages)
     handleClose();
   };

  return (
    <section className="d-flex">
      <div className="my-5 w-50 mr-3 px-5">
        {/* Text box */}
        <Form>
          <Form.Group controlId="textBox">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Profile or Company overview here"
              value={textBoxValue}
              onChange={(e) => setTextBoxValue(e.target.value)}
            />
          </Form.Group>
        </Form>
        {/* Text entered */}
        <p className="mt-3">Overview: {textBoxValue}</p>
      </div>

      <div className="my-5 w-50 px-5">
      <Button
    variant="primary"
    onClick={handleShow}
    className="btn btn-primary"
    style={{
      backgroundColor: 'var(--secondBackground)',
      borderColor: 'var(--secondColor)'
    }}
  >
    Add your profile qualities
  </Button>
        {/* <Button variant="primary" onClick={handleShow}>
          Add your profile qualities
        </Button> */}
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Skills</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formLanguages">
                <Form.Label>Choose your languages 💻</Form.Label>       
        <div className="mb-3">
          { languageArray.map(codingLanguage => (
             <Form.Check key={`inline-${codingLanguage}-1`}
             inline
             label={codingLanguage}
             name="languages"
             type="checkbox"
             id={codingLanguage}
            onChange={(e) => handleLanguageCheckbox(e.target.checked,e.target.id)}
           />
          ))
          }
        </div>
              </Form.Group>
              <Form.Group controlId="formTechnologies">
                <Form.Label>Choose your tech stack 🍔</Form.Label>
                <div className="mb-3">
          { technologiesArray.map(techStack => (
             <Form.Check key={`inline-${techStack}-1`}
             inline
             label={techStack}
             name="technologies"
             type="checkbox"
             id={techStack}
            onChange={(e) => handleTechCheckbox(e.target.checked,e.target.id)}
           />
          ))
          }
        </div>
              </Form.Group>
              <Form.Group controlId="formSkills">
                <Form.Label>Choose your skills 🛠️</Form.Label>
            <div className="mb-3">
          { skillsArray.map(skillStack => (
             <Form.Check key={`inline-${skillStack}-1`}
             inline
             label={skillStack}
             name="skills"
             type="checkbox"
             id={skillStack}
            onChange={(e) => handleSkillsCheckbox(e.target.checked,e.target.id)}
           />
          ))
          }
        </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Display selected options */}
        <div>
  <p className="py-4">
    Selected Languages:
    <div>
      {languages.map((language) => (
        <span key={language}>{`${language} `}</span>
      ))}
    </div>
  </p>
  <p className="py-4">
    Selected Technologies:
    <div>
      {technologies.map((technology) => (
        <span key={technology}>{`${technology} `}</span>
      ))}
    </div>
  </p>
  <p className="py-4">
    Selected Skills:
    <div>
      {skills.map((skill) => (
        <span key={skill}>{`${skill} `}</span>
      ))}
    </div>
  </p>
</div>

      </div>
    </section>
  );
}

export default Profile;



