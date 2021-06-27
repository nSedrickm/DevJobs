import React, { useEffect, useState } from 'react';
import tw from "twin.macro";
import styled from "styled-components";
import heroBg from "images/hero.svg";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getJobs } from "services/api.service";
import { FiArrowRightCircle } from 'react-icons/fi';
import { Loader, Navbar, Footer } from 'components';

const Container = tw.div`w-full text-gray-800 bg-white`;
const Header = styled.header`
  ${tw`pt-24 md:pt-32 text-center md:h-screen md:relative bg-white bg-cover md:bg-contain md:bg-center`}
  background-image: url(${heroBg});
  background-repeat: no-repeat;
`;
const HeaderContent = tw.div`grid place-items-center p-8`;
const Heading = tw.h1`text-green-600 text-6xl md:text-8xl font-bold`;
const Description = tw.p`text-lg my-8 tracking-wide text-gray-700`;
const ButtonRow = tw.div`mt-4 flex flex-col md:flex-row md:justify-between`;
const Button = tw(Link)`px-24 py-3 mx-4 rounded-lg font-bold text-white mt-5 hover:bg-green-700`;
const ButtonPrimary = tw(Button)`bg-green-600`;
const ButtonOutline = tw(Button)`border border-green-600 text-green-600 hover:bg-green-100`;
const InlineLoader = tw(props => <Loader {...props} />)``;

const JobContainer = tw.div`p-4 sm:p-8 lg:p-20 flex flex-col md:flex-row justify-center`;
const JobNav = tw.nav`px-4 sm:px-8 pt-20 pb-10 lg:px-20 text-center md:text-left flex flex-col items-center justify-center lg:flex-row lg:justify-between`;
const JobNavTitle = tw.h2`font-bold text-3xl mb-8 lg:mb-0`;
const JobNavUl = tw.ul`inline-flex items-center`;
const JobNavLi = tw.li`font-semibold text-sm sm:text-base cursor-pointer p-2 py-1 `;
const JobCard = tw.div`p-5 m-4 rounded-lg shadow-lg md:w-1/2 lg:w-1/3 bg-white text-gray-500 border hover:border-green-600 hover:shadow-none`;
const JobCardTitle = tw.h3`font-bold text-xl md:text-2xl mb-4 text-gray-700`;
const JobCardBody = tw.div`mb-4`;
const JobMeta = tw.div`flex flex-row md:inline-flex text-sm lg:text-base py-2`;
const ApplyButton = tw.button`block w-full p-1 sm:p-2 rounded font-bold bg-green-600 hocus:bg-green-700 text-white mb-3`;
const DetailsButton = tw(Link)`block text-center w-full p-1 sm:p-2 rounded font-bold text-green-600 border border-green-600 hocus:bg-green-100`;
const Divider = tw.hr`mx-20 border-gray-300`;

const LandingPage = () => {

    const [jobs, setJobs] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getJobs()
            .then(response => {
                setJobs(response.data);
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
    }, []);

    const handleRefresh = () => {
        setLoading(true);
        getJobs()
            .then(response => {
                setJobs(response.data);
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

    return (
        <>
            <Navbar />
            <Container>
                <Header>
                    <HeaderContent>
                        <Heading>DevJobs</Heading>
                        <Description>&lt; Ctrl + F Developer Jobs Faster / &gt;</Description>
                        <ButtonRow>
                            <ButtonOutline to="/login">Log In</ButtonOutline>
                            <ButtonPrimary to="/signup">Sign Up</ButtonPrimary>
                        </ButtonRow>
                        <p tw="my-8 text-gray-500">You need to have an account to register/post jobs</p>
                    </HeaderContent>
                </Header>


                <JobNav>
                    <JobNavTitle>Posted Jobs</JobNavTitle>
                    <JobNavUl>
                        <JobNavLi tw=" bg-green-100 text-green-700">New Jobs</JobNavLi>
                        <JobNavLi>|</JobNavLi>
                        <JobNavLi >1 Week Ago</JobNavLi>
                        <JobNavLi>|</JobNavLi>
                        <JobNavLi >2 Weeks Ago</JobNavLi>
                        <JobNavLi>|</JobNavLi>
                        <JobNavLi >1 Month Ago</JobNavLi>
                    </JobNavUl>
                </JobNav>

                <Divider />

                <JobContainer>
                    {loading ? (
                        <InlineLoader tw="h-96" />
                    ) : (
                        <>
                            {jobs.length && (
                                jobs?.map(job => {
                                    return (
                                        <JobCard key={job.pk} >
                                            <JobCardBody>
                                                <JobCardTitle>{job.title}</JobCardTitle>
                                                <JobMeta>
                                                    <p>Company : {job.company_name}</p>
                                                </JobMeta>
                                                <JobMeta>
                                                    <p>Lagos,Nigeria</p>
                                                    <p tw="mx-1 md:mx-2">|</p>
                                                    <p>fulltime</p>
                                                    <p tw="mx-1 md:mx-2">|</p>
                                                    <p>$20000000/year</p>
                                                </JobMeta>
                                                <JobMeta>
                                                    <p tw="text-center">{job.users_applied ? job.users_applied : 0} applies</p>
                                                    <p tw="mx-1 md:mx-2">|</p>
                                                    <p>Posted {new Date(job.created_date).toLocaleString()}</p>
                                                </JobMeta>
                                            </JobCardBody>
                                            <ApplyButton>Apply</ApplyButton>
                                            <DetailsButton to={"/job/details/" + job.pk}>See Full Details</DetailsButton>
                                        </JobCard>
                                    )
                                }))}
                        </>
                    )}
                </JobContainer>

                <p tw="text-center text-3xl text-green-700 font-bold cursor-pointer py-12 flex items-center justify-center" onClick={() => handleRefresh()}>See More Jobs &nbsp; <FiArrowRightCircle /></p>


                <Divider />

                <HeaderContent tw="py-24 text-center">
                    <h4 tw="text-gray-500 text-2xl font-bold">To see And Post More Job Offers</h4>
                    <ButtonRow>
                        <ButtonOutline to="/login">Log In</ButtonOutline>
                        <ButtonPrimary to="/signup">Sign Up</ButtonPrimary>
                    </ButtonRow>
                    <p tw="my-8 text-gray-500">You need to have an account to register/post jobs</p>
                </HeaderContent>
            </Container>
            <Footer />
        </>
    )
}

export default LandingPage;