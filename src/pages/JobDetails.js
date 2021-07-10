import React, { useEffect, useState } from 'react';
import tw from "twin.macro";
import toast from "react-hot-toast";
import { getJobDetails, jobApplication } from "services/api.service";
import { Loader } from 'components';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { setAuthHeaders } from 'services/auth.service';

const Container = tw.div`w-full text-gray-800 bg-white p-8 md:p-12`;
const Header = tw.div`text-center md:h-64 md:relative bg-green-100 p-8 rounded-lg`;
const Heading = tw.h1`text-green-600 text-3xl font-bold`;
const Description = tw.p`text-lg tracking-wide text-gray-700`;
const JobNav = tw.nav`text-center md:text-left flex items-center justify-center`;
const JobNavUl = tw.ul`md:inline-flex items-center`;
const JobNavLi = tw.li`text-sm lg:text-base cursor-pointer px-2 py-1 lg:px-4 lg:py-2  mb-2 text-gray-500`;
const Divider = tw.span`hidden md:inline-flex px-2 py-1 lg:px-4 lg:py-2 text-green-600 mb-2`;
const Button = tw.button`block w-full sm:w-2/3 md:w-1/3 mb-12 mx-auto p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2`;
const ButtonLink = tw(Link)`block w-full sm:w-2/3 md:w-1/3 mb-12 mx-auto p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2`;

const JobDetails = () => {

    const { state } = useUserContext();
    const [details, setdetails] = useState({})
    const [loading, setLoading] = useState(true);
    const { pk } = useParams()
    const history = useHistory();

    useEffect(() => {

        console.log(pk)
        getJobDetails(pk)
            .then(response => {
                setdetails(response.data);
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("An error occured, could not get details please check your network and try again")
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    toast.error("An error occured, could not get details please check your network and try again")
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error("An error occured, could not get details please check your network and try again")
                }
                setLoading(false);
            });
    }, [pk]);

    const handleJobApplication = (pk) => {

        setLoading(true);
        setAuthHeaders(state);
        jobApplication(pk)
            .then(response => {
                toast.success(response.data.request);

                setTimeout(() => {
                    history.push("/")
                }, 800);
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("An error occured, could not get jobs")
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    toast.error("An error occured, could not get jobs")
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error("An error occured, could not get jobs")
                }
                setLoading(false);
            });
    }

    if (loading) return <Loader className="bg-white text-gray-600" />;

    return (
        <>
            
            <Container>
                <Header>
                    <Heading>Job Details</Heading>
                    <Description tw="my-4 text-xl">{details?.title || "not provided"}</Description>
                    <Description><Divider>|</Divider>{details?.company_name || "No company name"}<Divider>|</Divider></Description>
                    <JobNav>
                        <JobNavUl>
                            <JobNavLi ><strong>Country: </strong>{details?.country || "not provided"}</JobNavLi>
                            <Divider>|</Divider>
                            <JobNavLi><strong>Date Published: </strong>{new Date(details?.created_date).toLocaleString() || "not provided"}</JobNavLi>
                            <Divider>|</Divider>
                            <JobNavLi><strong>Deadline: </strong>{new Date(details?.closing_date).toLocaleString() || "not provided"}</JobNavLi>
                        </JobNavUl>
                    </JobNav>
                </Header>

                <div tw="mt-8 mb-24">
                    <div tw="my-8">
                        <h2 tw="text-2xl font-bold">About The Role</h2>
                        <Description tw="my-4">{details?.description || "not provided"}</Description>
                    </div>

                    <div tw="my-8">
                        <h2 tw="text-2xl font-bold">Job Requirements</h2>
                        <Description tw="my-4"> - Experience Level: {details?.experience_level || "not provided"}</Description>
                        <Description tw="my-4"> - Country: {details?.country || "not provided"}</Description>
                        <Description tw="my-4"> - State: {details?.state || "not provided"}</Description>
                        <Description tw="my-4"> - City: {details?.city || "not provided"}</Description>
                    </div>

                    <div tw="my-8">
                        <h2 tw="text-2xl font-bold">Perks</h2>
                        <Description tw="my-4"> - Expected Salary: {details?.expected_salary || "not provided"}</Description>
                    </div>

                    <div tw="my-8">
                        <h2 tw="text-2xl font-bold">Company Contact Details</h2>
                        <Description tw="my-4"> - Name: {details?.company_name || "not provided"}</Description>
                        <Description tw="my-4"> - Email: {details?.company_email || "not provided"}</Description>
                    </div>
                </div>

                {state.key && pk ? (
                    <Button onClick={() => { handleJobApplication(pk) }}>Apply</Button>
                ) : (
                    <ButtonLink to="/login">Login To Apply</ButtonLink>
                )}
            </Container>
            
        </>
    )
}

export default JobDetails;
