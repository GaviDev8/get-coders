import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SINGLE_JOB, QUERY_ME } from '../utils/queries';
import { DO_BID } from "../utils/mutations"

function singleJob() {
    const { jobId } = useParams();
    const [formState, setFormState] = useState({ newBid: "" });
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [doBid] = useMutation(DO_BID);
    const { loading: jobLoading, error: jobError, data: jobData } = useQuery(GET_SINGLE_JOB, {
        variables: { jobId },
    });

    let job = null;
    if (jobData) {
        job = jobData.job;
    }

    const { loading: userLoading, error: userError, data: userData } = useQuery(QUERY_ME);

    let userId = null;
    if (userData) {
        userId = userData.me._id;
    }

    if (jobLoading || userLoading) return <p>Loading...</p>;
    if (jobError || userError) return <p>Error: {jobError || userError.message}</p>;

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await doBid({
            variables: {
                currentBid: parseInt(formState.newBid),
                currentBider: userId
            }
        });
        setFormState({ newBid: '' })
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    function calculateTimeLeft() {
        const dateLimit = new Date(jobData.dateLimit);
        const difference = dateLimit - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });

    }

    return (
        <div className="container">
            <div>
                <h1>{jobData.title}</h1>
                <h2>Current Bid: {jobData.currentBid}</h2>
                <p>📅 Ends: {jobData.dateLimit}</p>
                <p>Starting Value: {jobData.payment}</p>
                <div>
                    <ul>
                        <li>
                            Additional Description
                            <p>{jobData.description}</p>
                        </li>
                        <li>Terms</li>
                    </ul>
                </div>
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="newBid">Your Bid</label>
                    <input
                        type="number"
                        className="form-control"
                        id="newBid"
                        placeholder="Enter your bid"
                        value={formState.newBid}
                        name="newBid"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Bid Now</button>
                <p>
                    {timeLeft.days} d, {timeLeft.hours} h, {timeLeft.minutes} m, {timeLeft.seconds} s
                </p>
            </form>
        </div>
    );
}

export default singleJob;
