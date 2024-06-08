import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SINGLE_JOB, QUERY_ME, QUERY_SINGLE_USER } from '../utils/queries';
import { DO_BID, FINISH_JOB } from "../utils/mutations"

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

    console.log(formState.newBid)

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const newBid = parseFloat(formState.newBid);
        console.log("newBid", newBid)
        console.log(jobInfo.payment)
        if (newBid > jobInfo.payment && newBid > jobInfo.currentBid) {
            alert("Your bid cannot be greater than the job payment value.");
            return;
        }

        if(user._id === jobInfo.currentBider){
            alert("You are winning this bid already!");
            return;
        }

        if(user._id === jobInfo.creatorId){
            alert("You are the creator of this Job")
            return;
        }

        await doBid({
            variables: {
                jobId: jobInfo._id,
                bidValue: newBid,
            },
            refetchQueries: [{ query: QUERY_ME }],
        });
    
        setFormState({ newBid: '' });
    };

    const [timeRemaining, setTimeRemaining] = useState('');
    const [formattedTargetDate, setFormattedTargetDate] = useState('');

    const handleFinishJob = async () => {
        try {
            const { data } = await finishJobMutation({
                variables: {
                    jobId: jobId
                }
            });
        } catch (error) {
            console.error('Error finishing job:', error);
        }
    };

    useEffect(() => {
        if (!jobInfo.createdAt) return;

        const parseDate = (dateString) => {
            const [monthDay, yearTime] = dateString.split(', ');
            const [month, day] = monthDay.split(' ');
            const [year, time] = yearTime.split(' at ');
            return new Date(`${month} ${parseInt(day)}, ${year} ${time}`);
        };

        const createdAtDate = parseDate(jobInfo.createdAt);
        const targetDate = new Date(createdAtDate.getTime() + 24 * 60 * 60 * 1000);

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
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
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
                            <h1 className="card-header mb-3">{jobInfo.title}</h1>
                            <blockquote className="blockquote mb-0">
                                <p className="card-text" >{jobInfo.description}</p>
                                <footer className="blockquote-footer">
                                    Job requested by: <cite title="Source Title">{jobInfo?.creatorId?.username}</cite>
                                </footer>
                            </blockquote>
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
                                            name="newBid"
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
                                    <h2>Winner: {jobInfo?.contractorId?.username}</h2>
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
