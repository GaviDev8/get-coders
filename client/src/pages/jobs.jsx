import { useState } from 'react';
import "./Jobs.css";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


import Auth from '../utils/auth';
import { ADD_JOB } from '../utils/mutations';

function JobsHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }
  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Bids</Link>

        {user ? (
          <>
            <h2>
              Job History for {user.username} {user.email}
            </h2>
            {user.map((JobId) => (
              <div key={JobId._id} className="my-2">
                <h3>
                  {new Date(parseInt(JobId.bidDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {JobId.bid.map(({ _id, image, title, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                      <Link to={`/bids/${_id}`}>
                        <img alt={title} src={`/images/${image}`} />
                        <p>{title}</p>
                      </Link>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}


function Jobs() {
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
      <Link to="/Bid">← Go to Bids</Link>
    </div>

  );
}



export default {Jobs, JobsHistory};
