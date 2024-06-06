import { useMutation } from "@apollo/client";
import { useState } from 'react';

function Profile() {
  const [languages, setLanguages] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [skills, setSkills] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="d-flex flex-column">
      <div className="w-50">

      </div>

  <div className="w-50">
<button type="button" className="btn btn-primary" onClick={()=> setShowModal(!showModal)}>
  Launch demo modal
</button>
    <div className={showModal ? "modal" : ''} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Skills</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div>
              <select 
                className="form-select" 
                value={languages} 
                onChange={(e) => setLanguages(e.target.value)}
              >
                <option value="">Choose your languages 💻</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div>
              <select 
                className="form-select" 
                value={technologies} 
                onChange={(e) => setTechnologies(e.target.value)}
              >
                <option value="">Choose your tech stack 🍔</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="Node.js">Node.js</option>
                <option value="SASS">SASS</option>
              </select>
            </div>
            <div>
              <select 
                className="form-select" 
                value={skills} 
                onChange={(e) => setSkills(e.target.value)}
              >
                <option value="">Choose your skills 🛠️</option>
                <option value="Project Management">Project Management</option>
                <option value="Risk Management">Risk Management</option>
                <option value="Strategic">Strategic</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
  );
}

export default Profile;

