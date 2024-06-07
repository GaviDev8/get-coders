import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SINGLE_JOB, QUERY_ME } from '../utils/queries';
import { DO_BID } from "../utils/mutations"

import "./jobInfo.css"

function singleJob() {
    const { jobId } = useParams();
    const [formState, setFormState] = useState({ newBid: "" });
    // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [doBid] = useMutation(DO_BID);

    const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
    const user = userData?.me || {};

    const { loading: jobLoading, error: jobError, data: jobData } = useQuery(GET_SINGLE_JOB, {
        variables: { jobId: jobId },
    });

    const jobInfo = jobData?.job || {};

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await doBid({
            variables: {
                currentBid: parseInt(formState.newBid),
                currentBider: user._id
            },
            refetchQueries: [{ query: QUERY_ME }],
        });
        setFormState({ newBid: '' })
    };

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setTimeLeft(calculateTimeLeft());
    //     }, 1000);

    //     return () => clearTimeout(timer);
    // });

    // function calculateTimeLeft() {
    //     const dateLimit = new Date(jobData?.dateLimit);

    //     if (!dateLimit || isNaN(dateLimit)) {
    //         return {};
    //     }

    //     const difference = dateLimit - new Date();
    //     let timeLeft = {};

    //     if (difference > 0) {
    //         timeLeft = {
    //             days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    //             hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    //             minutes: Math.floor((difference / 1000 / 60) % 60),
    //             seconds: Math.floor((difference / 1000) % 60),
    //         };
    //     }

    //     return timeLeft;
    // }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });

    }
    if (userLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="card" id="singleJobContainer">
            <div className="container my-4">
                <article className="card-body p-5">
                    <div className="row">
                        <div className="col">
                            <h1 className="title mb-3">{jobInfo.title}</h1>
                            <h2 className="mt-3 mb-3">Current Bid:</h2>
                            <p className="mt-3 mb-3">📅 Ends: 05/05/05</p>
                            <p className="mt-3 mb-3">Starting Value:</p>
                        </div>
                        <div className="col-sm-6">
                            <form onSubmit={handleFormSubmit}>
                                <div className="form-group">
                                    <label htmlFor="newBid">Your Bid</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="newBid"
                                        placeholder="Enter your bid"
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Bid Now</button>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="d-flex justify-content-between">
                                <ul className="list-unstyled d-flex">
                                    <li>Additional Description</li>
                                    <li>Terms</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}

export default singleJob;
