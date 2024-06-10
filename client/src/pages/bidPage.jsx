import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_JOBS, QUERY_ME } from '../utils/queries';
import "./bidPage.css"


function allJobs() {
    const [showAvailableJobs, setShowAvailableJobs] = useState(true);
    const { loading: userLoading, data: userData, refetch: refetchUserData } = useQuery(QUERY_ME);
    const user = userData?.me || {};

    const { loading: jobLoading, error: jobError, data: jobData, refetch: refetchJobData } = useQuery(GET_JOBS);

    const jobInfo = jobData?.jobs || [];

    useEffect(() => {
        const interval = setInterval(() => {
            refetchJobData();
        }, 500);

        return () => clearInterval(interval);
    }, [refetchJobData]);


    const [timeRemaining, setTimeRemaining] = useState([]);

    useEffect(() => {
        if (jobInfo.length === 0) return;

        const parseDate = (dateString) => {
            const [monthDay, yearTime] = dateString.split(', ');
            const [month, day] = monthDay.split(' ');
            const [year, time] = yearTime.split(' at ');
            return new Date(`${month} ${parseInt(day)}, ${year} ${time}`);
        };

        const timers = jobInfo.map((job, index) => {
            const createdAtDate = parseDate(job.createdAt);
            const targetDate = new Date(createdAtDate.getTime() + 24 * 60 * 60 * 1000);

            const calculateTimeRemaining = () => {
                const now = new Date();
                const difference = targetDate - now;

                if (difference <= 0) {
                    setTimeRemaining((prev) => {
                        const updated = [...prev];
                        updated[index] = 'Ended!';
                        return updated;
                    });
                    clearInterval(timer);
                    return;
                }

                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeRemaining((prev) => {
                    const updated = [...prev];
                    updated[index] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                    return updated;
                });
            };

            const timer = setInterval(calculateTimeRemaining, 1000);
            calculateTimeRemaining();
            return timer;
        });

        return () => timers.forEach(timer => clearInterval(timer));
    }, [jobInfo]);

    const toggleShowAvailableJobs = () => {
        setShowAvailableJobs(prevState => !prevState);
    };

    if (userLoading) {
        return <div>Loading...</div>;
    }
    return (
        <section className="job-cards-container text-white">
            <div className="m-3 mt-4">
                <button className={`toggle-button ${showAvailableJobs ? 'active' : ''}`} onClick={toggleShowAvailableJobs}>
                    <span className="toggle-label"></span>
                    <span className="toggle-icon">{showAvailableJobs ? 'Show Not Available Jobs ▼' : 'Show Available Jobs►'}</span>
                </button>
            </div>
            {jobInfo?.map((job, index) => (
                job.availability === showAvailableJobs && ( // Toggle functionality
                    <div className="container py-5" key={job._id}>
                        <div className="col-md-12 col-xl-10">
                            <div className="card shadow-0 border rounded-3  bg-dark">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-xl-6">
                                            <h5 className="fs-1">{job.title}</h5>
                                            <p className="mb-4 mb-md-0 fs-4">
                                                {job.description}
                                            </p>
                                            <div className="mt-1 mb-0 text-primary fs-5">
                                                <span><br />Availability: {job.availability ? 'Available' : 'Not Available'}</span>
                                                <span><br />Creator: {job.creatorId?.username}</span>
                                                <span><br />Delivery date: {job.dateLimit}<br /><br /></span>
                                                <span className={job.currentBider === user._id ? "text-success" : "text-danger"}>{job.currentBider === user._id ? "You are winnning" : "Current Bider: " + job.currentBider}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                            <div className="d-flex flex-row align-items-center mb-1">
                                                <h4 className="mb-1 me-1 text-white fs-2">${job.currentBid}</h4>
                                                <span className="text-danger fs-5"><s>${job.payment}</s></span>
                                            </div>
                                            <h6 className="text-success">{job.availability}</h6>
                                            <div className="d-flex flex-column mt-4">
                                                <Link to={`/jobs/${job._id}`} className="btn btn-light btn-lg mb-5 mt-3" role="button">
                                                    Open Job
                                                </Link>
                                                <div className="fs-2">
                                                    <p className={timeRemaining[index] !== "Ended!" ? "text-success mt-3" : "text-danger mt-3"}>{timeRemaining[index]}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ))}
        </section>
    );
}

export default allJobs;
