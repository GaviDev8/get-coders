import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SINGLE_JOB, QUERY_ME, QUERY_SINGLE_USER } from '../utils/queries';
import { DO_BID, FINISH_JOB } from "../utils/mutations"
import moment from 'moment';

import "./jobInfo.css"

function singleJob() {
    const { jobId } = useParams();
    const [formState, setFormState] = useState({ newBid: "" });
    const [finishJobMutation, { data, loading, error }] = useMutation(FINISH_JOB);
    let singleUser = {};
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

    const [timeRemaining, setTimeRemaining] = useState('');
    const [formattedTargetDate, setFormattedTargetDate] = useState('');
    const { loading: singleUserLoading, error: singleUserError, data: singleUserData, refetch: refetchSingleUser } = useQuery(QUERY_SINGLE_USER, {
        variables: { userId: jobInfo.currentBider },
        skip: !jobInfo.currentBider,
    });

    const handleFinishJob = async () => {
        try {
            const { data } = await finishJobMutation({
                variables: {
                    jobId: jobId
                }
            });
            refetchSingleUser();
        } catch (error) {
            console.error('Error finishing job:', error);
        }
    };

    // console.log("createdAtDate", createdAtDate)
    // console.log("targetDate", targetDate)

    useEffect(() => {
        if (!jobInfo.createdAt) return;
    
        // Manually parse the createdAt date
        const parseDate = (dateString) => {
            const [monthDay, yearTime] = dateString.split(', ');
            const [month, day] = monthDay.split(' ');
            const [year, time] = yearTime.split(' at ');
            return new Date(`${month} ${parseInt(day)}, ${year} ${time}`);
        };
    
        const createdAtDate = parseDate(jobInfo.createdAt);
        console.log("createdAtDate", createdAtDate)
        const targetDate = new Date(createdAtDate.getTime() + 24 * 60 * 60 * 1000);
        console.log("targetDate", targetDate)
    
        setFormattedTargetDate(targetDate.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }));
    
        const calculateTimeRemaining = () => {
            const now = new Date();
            const difference = targetDate - now;
    
            if (difference <= 0) {
                setTimeRemaining('Ended!');
                handleFinishJob();
                clearInterval(timer);
                return;
            }
    
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
            setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        };
        const timer = setInterval(calculateTimeRemaining, 1000);
        calculateTimeRemaining();
 
    
        return () => clearInterval(timer);
    }, [jobInfo.createdAt]);



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
                            <p>{jobInfo.description}</p>
                            <h2 className="mt-3 mb-3">Current Bid: ${jobInfo.currentBid}</h2>
                            <p className="mt-3 mb-3">📅 Ends: {formattedTargetDate}</p>
                            <p className="mt-3 mb-3">Starting Value: ${jobInfo.payment}</p>
                        </div>
                        <div className="col-sm-6">
                            {timeRemaining !== "Ended!" ? (
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="newBid">{jobInfo.currentBider === user._id ? "Your Bid: " + jobInfo.currentBid : null}</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="newBid"
                                            placeholder="Enter your bid"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Bid Now</button>
                                    <div className="timer">
                                        <p className="mt-3 text-success">{timeRemaining}</p>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    <h2>Winner: {jobInfo.currentBider}</h2>
                                    <p className="mt-3 text-danger">{timeRemaining}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}

export default singleJob;
