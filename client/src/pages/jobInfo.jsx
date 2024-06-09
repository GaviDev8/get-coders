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
    const [showTerms, setShowTerms] = useState(false);
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

        if (user._id === jobInfo.creatorId) {
            alert("You are the creator of this Job")
            return;
        }
        else if (user._id === jobInfo.currentBider) {
            alert("You are winning this bid already!");
            return;
        }
        else if (newBid > jobInfo.payment && newBid > jobInfo.currentBid) {
            alert("Your bid cannot be greater than the job payment value.");
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

    const toggleTerms = () => {
        setShowTerms(!showTerms);
    };

    if (userLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="card text-white bg-dark mb-3" id="singleJobContainer">
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

                                <p className="mt-3 mb-3">📅 <span id="startingValue">Delivery Date:</span> {formattedTargetDate}</p>
                                <div className="d-flex justify-content-between mt-3 mb-3">
                                    <div className="d-flex align-items-start mt-3 mb-3">
                                        <div className="me-5">
                                            <span id="startingValue">Starting Value</span>
                                            <br />
                                            {jobInfo.payment}
                                        </div>
                                        <div>
                                            <span id="startingValue">Current Bid</span>
                                            <br />
                                            {jobInfo.currentBid}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                {timeRemaining !== "Ended!" ? (
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="form-group" id="newBidForm">
                                            <h2 className={jobInfo.currentBider === user._id ? "text-success" : "text-danger"}>{jobInfo.currentBider === user._id ? "You are winnning" : "Current Bider: " + jobInfo.currentBider}</h2>
                                            <label id="bidLabel" htmlFor="newBid">{jobInfo.currentBider === user._id ? "Your Bid: " + "$" + jobInfo.currentBid : null}</label>
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
                                        {user._id === jobInfo?.contractorId?._id ? (

                                            <h2><br />
                                                <span className="text-success">Congratulations you won!!</span>
                                                <br />
                                                Please contact the recruiter using the email
                                                <br />
                                                <br />
                                                {jobInfo?.creatorId?.email}
                                            </h2>
                                        ) : (
                                            null
                                        )}
                                        {user._id === jobInfo?.creatorId?._id ? (

                                            <h2><br />Please contact the contractor using the email
                                                <br />
                                                <br />
                                                {jobInfo?.contractorId?.email}
                                            </h2>
                                        ) : (
                                            null
                                        )}
                                        <p className="mt-3 text-danger" id="remainingTime">{timeRemaining}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </article>
                </div>
                <div className="card bg-dark text-white mb-3" style={{ maxWidth: '100%' }}>
                    <div className="row g-0">
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <img src="/images/Get coders.png" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-6">
                            <div className="card-body">
                                <div className="container">
                                    <div className="terms-and-conditions">
                                        <div>
                                            <h3 id="conditionTerms" className="clickable" onClick={toggleTerms} style={{ marginRight: '10px' }}>
                                                Terms and Conditions for Bidding
                                            </h3>
                                            <button onClick={toggleTerms} style={{ fontSize: '0.8vw' }} className="btn btn-info">
                                                {showTerms ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                        {showTerms && (
                                            <div>
                                            <ol id="termsList" className="mt-4">
                                                <li>
                                                    <strong className="text-danger">Job Posting:</strong> You can only bid on jobs that are legitimate and adhere to our community guidelines.
                                                </li>
                                                <li>
                                                    <strong className="text-danger">Fair Bidding:</strong> Ensure your bid amount reflects the fair value of the work and your capabilities to complete the job.
                                                </li>
                                                <li>
                                                    <strong className="text-danger">Payment and Compensation:</strong> The winning bidder will receive the agreed bid amount upon successful completion of the job.
                                                </li>
                                                <li>
                                                    <strong className="text-danger">Responsibilities:</strong> Both the job poster and the bidder have specific responsibilities regarding job completion, communication, and payment.
                                                </li>
                                                <li>
                                                    <strong className="text-danger">Dispute Resolution:</strong> In case of any disputes, both parties should first try to resolve the issue through direct communication.
                                                </li>
                                                <li>
                                                    <strong className="text-danger">Community Guidelines:</strong> Treat all users with respect and honesty. Harassment, discrimination, or any form of abuse is not tolerated.
                                                </li>
                                                <li>
                                                    <strong className="text-danger">Privacy and Security:</strong> Protect your personal information and respect the privacy of others. Keep your account secure and report any suspicious activity.
                                                </li>
                                            </ol>
                                            <p className="text-danger">By placing your bid, you agree to comply with these terms and conditions.</p>
                                            </div>
                                        )}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default singleJob;
