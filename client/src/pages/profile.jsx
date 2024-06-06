import { useMutation } from "@apollo/client";
import { useState } from "react";

function Profile() {
  const [languages, setLanguages] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [skills, setSkills] = useState('');

  return (
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
      
      <select 
        className="form-select" 
        value={skills} 
        onChange={(e) => setSkills(e.target.value)}
      >
        <option value="">Choose your skills 🛠️</option>
        <option value="Project Management">Python</option>
        <option value="Risk Management">Java</option>
        <option value="Strategic">C#</option>
      </select>
    </div>
  );
}

export default Profile;
