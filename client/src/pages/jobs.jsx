import React from 'react'
import "./Jobs.css";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';


import Auth from '../utils/auth';
import { ADD_JOB } from '../utils/mutations';

function Jobs(bidOffer) {
  const [formState, setFormState] = useState({ email: '', password: '', bid: '' });
  const [addJob] = useMutation(ADD_JOB);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addJob({
      variables: {
        email: formState.email,
        password: formState.password,
        bid: formState.bid
      },
    });
    const token = mutationResponse.data.addJob.token;
    Auth.recruiter(token);
  };

  const handleChange = (event) => {
    const { name, bidValue } = event.target;
    setFormState({
      ...formState,
      [name]: bidValue,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/login">← Go to Login</Link>

      <h2>Job type</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="title">the Job:</label>
          <input
            placeholder="title"
            description="jobDescription"
            bidOffer="jobValue"
            JobId="string"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="Recruiter">who posted this:</label>
          <input
            placeholder="Recruiter"
            name="userName"
            userLink="userId"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Jobs;

