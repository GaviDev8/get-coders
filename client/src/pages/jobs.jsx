import { useState } from 'react';
import "./Jobs.css";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';


import Auth from '../utils/auth';
import { ADD_JOB } from '../utils/mutations';


function Jobs() {
  const [formState, setFormState] = useState({ description: '',title: '', dateLimit: '', payment: '' });
  const [addJob] = useMutation(ADD_JOB);

  const { loading, data } = useQuery(QUERY_ME);
  
   const user = data?.me || {};
console.log(user)
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState)
     await addJob({
      variables: {
        description:formState.description,title: formState.title, dateLimit: formState.dateLimit, payment: parseInt(formState.payment)
      },
      refetchQueries: [{ query: QUERY_ME }],
    });
      setFormState({ description: '',title: '', dateLimit: '', payment: '' })
    
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    
  }
  ;
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <section>
    <div className="container my-1">

      <h2>Job type</h2>
      
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="title">Job title:</label>
          <input
            placeholder="title"
            id="title"
            value={formState.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="description">Job Description:</label>
          <input
            placeholder="description"
            name="description"
            id="description"
            value={formState.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="dateLimit">Time Remaining:</label>
          <input
            placeholder="dateLimit"
            name="dateLimit"
            id="dateLimit"
            value={formState.dateLimit}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="payment">Max payment:</label>
          <input
            placeholder="payment"
            name="payment"
            id="payment"
            value={formState.payment}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
      <Link to="/Bid">← Go to Bids</Link>
    
    </div>
    <div className="container my-1">
        {/* <Link to="/">← Back to Bids</Link> */}

        {user && (
          <>
            <h2>
              Job History for {user.username}
            </h2>
            {user.createdJobs && user.createdJobs.map((job, index) => (
              <div key={`${index} ${job._id}`} className="my-2">
                <h3>
                 {job.title}
                 {job.price}
                 {job.description}
                  {/* {new Date(parseInt(JobId.bidDate)).toLocaleDateString()} */}
                </h3>
                <div className="flex-row">
                  {job.bid && job.bid.map(({ _id, image, title, price }, index) => (
                    <div key={`${_id} ${index}`} className="card px-1 py-1">
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
        ) }
      </div>
    </section>
  );
}



export default Jobs;
