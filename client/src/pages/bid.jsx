import { useState } from 'react';
import "./bid.css";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// ADD_BID does not exist yet
import { ADD_BID } from '../utils/mutations';

function Bids() {
    const [formState, setFormState] = useState({ description: '',title: '', dateLimit: '', currentBid: '', bidAmount: '' });
    const [addBid] = useMutation(ADD_BID);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState)
         await addBid({
          variables: {
            description: formState.description, title: formState.title, dateLimit: formState.dateLimit, currentBid: parseInt(formState.bidAmount), bidAmount: parseInt(formState.bidAmount)
          },
        });
          setFormState({ description: '',title: '', dateLimit: '', bidAmount: '' })
        
      };

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
        
      };
      // so basically i need to map all the bids
      // to an individual card for each
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
            <Link to="/">← Back to Bids</Link>
    
            {user ? (
              <>
                <h2>
                  Job History for {user.username} {user.email}
                </h2>
                {user.createdJobs.map((JobId) => (
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
        </section>
      );
    }
    
    
    
    export default Bids;
    