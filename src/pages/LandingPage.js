import React, { useEffect, useState } from 'react';
import tw from "twin.macro";
import { getJobs } from "services/api.service";

const Container = tw.div`w-full text-gray-800`;
const Header = tw.header`py-24 md:py-48 text-center  grid place-items-center h-screen`;
const HeaderContent = tw.div`p-8`;
const Heading = tw.h1`text-green-500 text-6xl md:text-8xl font-bold`;
const Description = tw.p`text-lg my-8 tracking-wide text-gray-700`;
const ButtonRow = tw.div`mt-4 flex flex-col md:flex-row md:justify-between`;
const Button = tw.button`px-24 py-3 mx-4 rounded-lg font-bold text-white mt-5 hocus:bg-green-600`;
const SignUpButton = tw(Button)`bg-green-500`;
const LogInButton = tw(Button)`border border-green-500 text-green-500 hocus:text-white`;

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
                        <LogInButton>Sign In</LogInButton>
                        <SignUpButton>Sign Up</SignUpButton>
                    </ButtonRow>
                    <p tw="my-8 text-gray-500">You need to have an account to register/post jobs</p>
                </HeaderContent>
            </Header>

            {loading ? (
                <p>Loading please wait</p>
            ) : (
                <>
                    {jobs.length && (
                        jobs?.map(job => {
                            return (
                                <div
                                    className="p-4 my-4 shadow-lg bg-gray-100"
                                    key={job.pk}
                                >
                                    <p key="1">pk: {job.pk}</p>
                                    <p key="2">Company ID: {job.company_id}</p>
                                    <p key="3">Title: {job.title}</p>
                                    <p key="4">Company Name: {job.company_name}</p>
                                    <p key="5">Duration: {job.duration}</p>
                                    <p key="6">experience_level": {job.experience_level}</p>
                                    <p key="7">expected_salary": {job.expected_salary}</p>
                                    <p key="8">Users Applied": {job.users_applied}</p>
                                    <p key="9">Created Date": {job.created_date}</p>
                                    <a key="10" href={job.url}>learn more about this job</a>
                                </div>
                            )
                        }))}
                </>
            )}

            <Button onClick={() => handleRefresh()}>refresh jobs</Button>

        </Container>

    )
}

export default LandingPage;