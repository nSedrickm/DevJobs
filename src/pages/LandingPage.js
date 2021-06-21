import React, { useEffect, useState } from 'react';
import tw from "twin.macro";
import { getJobs } from "services/api.service";

const Container = tw.div`w-full text-gray-800`;
const Header = tw.header`pt-24 md:py-32 text-center md:h-screen md:relative`;
const HeaderContent = tw.div`grid place-items-center p-8`;
const JobsNav = tw.div`lg:absolute bottom-20 inset-x-12 flex flex-col md:flex-row justify-between`;
const Heading = tw.h1`text-green-500 text-6xl md:text-8xl font-bold`;
const Description = tw.p`text-lg my-8 tracking-wide text-gray-700`;
const ButtonRow = tw.div`mt-4 flex flex-col md:flex-row md:justify-between`;
const Button = tw.button`px-24 py-3 mx-4 rounded-lg font-bold text-white mt-5 hocus:bg-green-600`;
const ButtonPrimary = tw(Button)`bg-green-500`;
const ButtonOutline = tw(Button)`border border-green-500 text-green-500 hocus:text-white`;

const LandingPage = () => {

    const [jobs, setJobs] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getJobs()
            .then(response => {
                setJobs(response.data);
                console.log(response.data);
                setLoading(false);
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
                setLoading(false);
            });
    }, []);

    const handleRefresh = () => {
        setLoading(true);
        getJobs()
            .then(response => {
                setJobs(response.data);
                console.log(response.data);
                setLoading(false);
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
                setLoading(false);
            });
    }

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <Heading>DevJobs</Heading>
                    <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Description>
                    <ButtonRow>
                        <ButtonOutline>Sign In</ButtonOutline>
                        <ButtonPrimary>Sign Up</ButtonPrimary>
                    </ButtonRow>
                    <p tw="my-8 text-gray-500">You need to have an account to register/post jobs</p>
                </HeaderContent>
                <JobsNav>
                    <h2 tw="font-bold text-2xl mb-4">Posted Jobs</h2>
                    <ul tw="inline-flex items-center text-sm md:text-base font-bold">
                        <li tw="cursor-pointer px-4 py-1 mx-2 bg-green-100 text-green-600">New Jobs</li>
                        <li>|</li>
                        <li tw="cursor-pointer px-4 py-1 mx-2">1 Week Ago</li>
                        <li>|</li>
                        <li tw="cursor-pointer px-4 py-1 mx-2">2 Weeks Ago</li>
                        <li>|</li>
                        <li tw="cursor-pointer px-4 py-1 mx-2">1 Month Ago</li>
                    </ul>
                </JobsNav>
            </Header>

            <hr tw="mx-12" />

            <div tw="p-4 md:p-12 flex flex-col md:flex-row">
                {loading ? (
                    <p>Loading please wait</p>
                ) : (
                    <>
                        {jobs.length && (
                            jobs?.map(job => {
                                return (
                                    <div className="p-8 my-4 rounded-lg shadow-lg md:w-1/3 text-gray-500 border hover:border-green-500" key={job.pk} >
                                        <div tw="mb-4">
                                            <h3 tw="font-bold text-3xl mb-4 text-gray-700">{job.title}</h3>
                                            <p>Company : {job.company_name}</p>
                                            <p>Company Name: {job.company_name}</p>
                                            <p>Duration: {job.duration}</p>
                                            <p>experience_level": {job.experience_level}</p>
                                            <p>expected_salary": {job.expected_salary}</p>
                                            <p>Users Applied": {job.users_applied}</p>
                                            <p>Created Date": {job.created_date}</p>
                                        </div>
                                        <button tw="w-full p-2 rounded font-bold bg-green-500 hocus:bg-green-600 text-white mb-2">Apply</button>
                                        <a a href={job.url} tw="block text-center w-full p-2 rounded font-bold text-green-500 border border-green-500 hocus:bg-green-600 hocus:text-white">See Full Details</a>
                                    </div>
                                )
                            }))}
                    </>
                )}
            </div>

            <p tw="text-center text-3xl text-green-600 font-bold cursor-pointer my-12" onClick={() => handleRefresh()}>See More Jobs</p>
            <hr tw="mx-12" />

            <HeaderContent tw="my-12">
                <h4 tw="text-gray-500 text-3xl font-bold">To see And Post More Job Offers</h4>
                <ButtonRow>
                    <ButtonOutline>Sign In</ButtonOutline>
                    <ButtonPrimary>Sign Up</ButtonPrimary>
                </ButtonRow>
                <p tw="my-8 text-gray-500">You need to have an account to register/post jobs</p>
            </HeaderContent>
        </Container>
    )
}

export default LandingPage;