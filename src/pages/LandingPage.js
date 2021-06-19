import React, { useEffect, useState } from 'react';
import { getJobs } from "services/api.service";

const LandingPage = () => {

    const [jobs, setJobs] = useState({})

    useEffect(() => {
        getJobs()
            .then(response => {
                setJobs(response.data);
                console.log(response.data);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    window.alert("An error occured, could not get jobs")
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    window.alert("An error occured, could not get jobs")
                } else {
                    // Something happened in setting up the request that triggered an Error
                    window.alert("An error occured, could not get jobs")
                }
            });
    }, []);

    return (
        <>
            <h1>Fetched Jobs</h1>
            {jobs.length && (
                jobs?.map(job => {
                    return (
                        <>

                            <ul>
                                <li key={job.id}>{job.title}
                                    <ul>
                                        <li>tags: {job.tags.map(tag => <span>{tag},</span>)}</li>
                                        <li><a href={job.url}>{job.url}</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </>
                    )
                }))
            }
        </>
    )
}

export default LandingPage;