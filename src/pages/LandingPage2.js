import React, { useEffect, useReducer } from 'react';
import tw from "twin.macro";
import jobOfferIllustration from "images/job_offers.svg";
import postIllustration from "images/post_online.svg";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getJobs } from "services/api.service";
import { Loader } from 'components';
import { getLocalJobs, setLocalJobs } from 'services/storage.service';
import { Pagination } from 'evergreen-ui';
import { paginateFunc, filterFunc } from 'utils/filters';
import { BsPeopleCircle } from 'react-icons/bs';
import { FiSearch, FiUserPlus } from 'react-icons/fi';

const Container = tw.div`p-4 w-full text-secondary bg-primary-lightest`;
const HeaderContent = tw.div`grid place-items-center p-8`;
const ButtonRow = tw.div`mt-4 flex flex-col md:flex-row md:justify-between`;
const Button = tw(Link)`px-24 py-3 mx-4 rounded-lg font-bold text-primary-lightest mt-5 hover:bg-green-700`;
const ButtonPrimary = tw(Button)`bg-primary`;
const RefreshButton = tw.button`px-12 py-3 mx-auto rounded-lg font-bold text-primary-lightest mt-5 bg-green-700`;

const InlineLoader = tw(props => <Loader {...props} />)``;

const JobContainer = tw.div`p-4 sm:p-12 lg:p-20 justify-center grid md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center place-content-center`;
const JobNav = tw.nav`px-4 sm:px-8 pt-20 pb-10 lg:px-20 text-center md:text-left flex flex-col items-center justify-center lg:flex-row lg:justify-between`;
const JobNavTitle = tw.h2`font-bold text-3xl mb-8 lg:mb-0`;
const JobNavUl = tw.ul`inline-flex items-center`;
const JobNavLi = tw.li`font-semibold text-sm sm:text-base cursor-pointer p-2 py-1 `;
const JobCard = tw.div`p-5 mx-auto w-full rounded-xl shadow-lg  bg-white text-gray-500 border hover:border-primary hover:shadow-none`;
const JobCardTitle = tw.h3`font-bold text-xl md:text-2xl mb-4 text-gray-700`;
const JobCardBody = tw.div`mb-4`;
const JobMeta = tw.div`text-sm lg:text-base py-2`;
const DetailsButton = tw(Link)`block text-center w-full p-2 sm:py-1.5 rounded font-bold text-sm border border-primary bg-primary hocus:bg-green-700 text-primary-lightest mb-3`;
const Divider = tw.hr`mx-20 border-gray-300`;

let cachedJobs = getLocalJobs();

let initialState = {
    jobs: cachedJobs || [],
    pageItems: [],
    page: 1,
    loading: false,
    active: 0
}

function reducer(state, action) {
    switch (action.type) {
        case 'setJobs':
            return {
                ...state,
                jobs: action.payload
            };
        case 'changePage':
            return {
                ...state,
                page: action.payload
            };
        case 'paginateJobs':
            const start = 6 * (state.page - 1)
            const end = start + 6;
            let paginatedItems = paginateFunc(state.jobs, start, end);
            return {
                ...state,
                pageItems: paginatedItems
            };
        case 'filterJobs':
            let filtered = filterFunc(state.jobs, action.payload);
            return {
                ...state,
                pageItems: filtered,
                loading: !state.loading
            };
        case 'loading':
            return {
                ...state,
                loading: action.payload
            };
        case 'setActive':
            return {
                ...state,
                active: action.payload
            };
        default:
            throw new Error();
    }
}

const LandingPage2 = () => {

    const [lstate, ldispatch] = useReducer(reducer, initialState);
    const { jobs, page, pageItems, loading, active } = lstate;

    useEffect(() => {
        if (!jobs?.length) {
            ldispatch({ type: "loading", payload: true });
            getJobs()
                .then(response => {
                    ldispatch({ type: "setJobs", payload: response.data });
                    ldispatch({ type: "paginateJobs" });
                    setLocalJobs(response.data);
                    ldispatch({ type: "loading", payload: false });
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
                    ldispatch({ type: "loading", payload: false });
                });
        } else {
            ldispatch({ type: "paginateJobs" });
        }
    }, [jobs]);

    const handleRefresh = () => {
        ldispatch({ type: "loading", payload: true });
        getJobs()
            .then(response => {
                console.log(response.data)
                ldispatch({ type: "setJobs", payload: response.data });
                ldispatch({ type: "paginateJobs" });
                setLocalJobs(response.data);
                ldispatch({ type: "loading", payload: false });
                ldispatch({ type: "setActive", payload: 0 });
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
                ldispatch({ type: "loading", payload: false });
            });
    }


    return (
        <Container>
            <div className="flex flex-col justify-between p-4 bg-cover sm:p-12 lg:p-20 md:relative md:bg-contain md:bg-center md:flex-row">
                <div className="w-full mb-4 md:w-1/2 md:mb-0">
                    <h1 className="text-3xl font-bold leading-normal tracking-wide text-primary">Job Opportunities <span className="text-secondary">For</span></h1>
                    <h1 className="text-3xl font-bold leading-normal tracking-wide text-primary">Developers <span className="text-secondary">Accross The Globe</span></h1>
                    <p className="my-8 text-lg leading-relaxed tracking-normal">
                        Finding your dream job as a developer just got easier. We curate and deliver top  jobs ifor developers across the globe straight to your inbox.
                    </p>
                </div>
                <img
                    src={jobOfferIllustration}
                    alt="job offer illustration"
                    className="h-80 md:w-1/2 "
                />
            </div>

            <div className="my-4">

                <h2 tw="text-primary text-3xl font-bold text-center tracking-wide leading-normal">How We Work</h2>

                <JobContainer tw="lg:py-12">
                    <JobCard tw="text-center text-secondary h-60">
                        <JobCardBody>
                            <JobCardTitle tw="my-8 text-lg text-primary inline-flex justify-center items-center">
                                <BsPeopleCircle size={24} /> &nbsp; Create Account
                            </JobCardTitle>
                            <p>First, you have to <Link tw="text-primary" to="/signup">create an account</Link> with Devjobs to search for Jobs.</p>
                        </JobCardBody>
                    </JobCard>

                    <JobCard tw="text-center text-secondary h-60">
                        <JobCardBody>
                            <JobCardTitle tw="my-8 text-lg text-primary inline-flex justify-center items-center">
                                <FiSearch size={24} /> &nbsp; Search For Jobs
                            </JobCardTitle>
                            <p><span tw="text-primary">Search</span> among the available <span tw="text-primary">jobs</span> for your dream job </p>
                        </JobCardBody>
                    </JobCard>

                    <JobCard tw="text-center text-secondary h-60">
                        <JobCardBody>
                            <JobCardTitle tw="my-8 text-lg text-primary inline-flex justify-center items-center">
                                <FiUserPlus size={24} /> &nbsp; Apply For Jobs</JobCardTitle>
                            <p><span tw="text-primary">Apply</span> for jobs with just <span tw="text-primary">two clicks </span> and enjoy your dream job </p>
                        </JobCardBody>
                    </JobCard>
                </JobContainer>

            </div>

            <JobNav>
                <JobNavTitle>Posted Jobs</JobNavTitle>
                <JobNavUl>
                    <JobNavLi
                        className={`${active === 0 && 'bg-green-100 text-green-700'}`}
                        onClick={() => {
                            ldispatch({ type: "changePage", payload: (jobs?.length / 6) });
                            ldispatch({ type: "paginateJobs" });
                            ldispatch({ type: "setActive", payload: 0 });
                        }}
                    >
                        New Jobs
                    </JobNavLi>
                    <JobNavLi>|</JobNavLi>
                    <JobNavLi
                        className={`${active === 1 && 'bg-green-100 text-green-700'}`}
                        onClick={() => {
                            ldispatch({ type: "loading", payload: true })
                            ldispatch({ type: "filterJobs", payload: "1Week" })
                            ldispatch({ type: "setActive", payload: 1 })
                        }}
                    >
                        1 Week Ago
                    </JobNavLi>
                    <JobNavLi>|</JobNavLi>
                    <JobNavLi
                        className={`${active === 2 && 'bg-green-100 text-green-700'}`}
                        onClick={() => {
                            ldispatch({ type: "loading", payload: true })
                            ldispatch({ type: "filterJobs", payload: "2Weeks" })
                            ldispatch({ type: "setActive", payload: 2 })
                        }}
                    >
                        2 Weeks Ago
                    </JobNavLi>
                    <JobNavLi>|</JobNavLi>
                    <JobNavLi
                        className={`${active === 3 && 'bg-green-100 text-green-700'}`}
                        onClick={() => {
                            ldispatch({ type: "loading", payload: true })
                            ldispatch({ type: "filterJobs", payload: "1Month" })
                            ldispatch({ type: "setActive", payload: 3 })
                        }}
                    >
                        1 Month Ago
                    </JobNavLi>
                </JobNavUl>
            </JobNav>

            <Divider />


            {loading ? (
                <InlineLoader tw="h-96 bg-white m-4 sm:m-12 lg:m-20 shadow-lg rounded-md" />
            ) : (
                <>
                    {pageItems?.length === 0 && (
                        <div tw="h-96 bg-white m-4 sm:m-12 lg:mx-20 shadow-lg rounded-md grid place-items-center text-center">
                            <div>
                                <p tw="text-2xl mx-auto mb-2 font-bold text-secondary-lightest">Sorry there are no available jobs for this period</p>
                                <RefreshButton onClick={() => handleRefresh()}>Refresh</RefreshButton>
                            </div>
                        </div>
                    )}

                    {pageItems?.length > 0 && (
                        <JobContainer>
                            {pageItems?.map(job => {
                                return (
                                    <JobCard key={job.pk} >
                                        <JobCardBody>
                                            <JobCardTitle>{job.title}</JobCardTitle>
                                            <JobMeta>
                                                <p tw="mb-1"><span tw="font-bold text-secondary-light">Company : </span>{job.company_name}</p>
                                                <p tw="mb-1"><span tw="font-bold text-secondary-light">Expected Salary: </span>{job.expected_salary}</p>
                                                <p tw="mb-1"><span tw="font-bold text-secondary-light">Experience Level: </span>{job.experience_level}</p>
                                                <p tw="mb-1"><span tw="font-bold text-secondary-light">Posted: </span>{new Date(job.created_date).toLocaleString()}</p>
                                            </JobMeta>
                                        </JobCardBody>
                                        <DetailsButton to={"/job/details/" + job.pk}>See Full Details</DetailsButton>
                                    </JobCard>
                                )
                            })}
                        </JobContainer>
                    )}

                    <div className="flex justify-center mx-auto">
                        <Pagination
                            page={page}
                            totalPages={(jobs?.length / 6) + 1}
                            onPageChange={(evt) => {
                                ldispatch({ type: "changePage", payload: evt });
                                ldispatch({ type: "paginateJobs" });
                            }}
                            onNextPage={() => {
                                ldispatch({ type: "changePage", payload: page + 1 });
                                ldispatch({ type: "paginateJobs" });
                            }}
                            onPreviousPage={() => {
                                ldispatch({ type: "changePage", payload: page - 1 });
                                ldispatch({ type: "paginateJobs" });
                            }}
                        />

                    </div>
                </>
            )}

            <HeaderContent tw="py-20 text-center">
                <h4 tw="text-gray-500 text-xl font-bold">To see And Post More Job Offers</h4>
                <ButtonRow>
                    <ButtonPrimary to="/signup">Sign Up</ButtonPrimary>
                </ButtonRow>
                <p tw="my-8 text-gray-500">Already Have An Account? <Link tw="text-primary" to="/login">Sign In Here</Link></p>
            </HeaderContent>

            <Divider />

            <div className="flex flex-col justify-center p-4 bg-cover sm:p-12 lg:p-20 md:relative md:bg-contain md:bg-center md:flex-row">
                <img
                    src={postIllustration}
                    alt="job offer illustration"
                    className=""
                />
                <div className="mx-8 mt-24 md:mb-0">
                    <h1 className="text-3xl font-bold leading-normal tracking-wide">Are You <span className="text-primary">In Search Of A Developer</span></h1>
                    <h1 className="text-3xl font-bold leading-normal tracking-wide">To Recruit For Your Company</h1>
                    <p className="my-8 text-lg leading-relaxed tracking-wide">
                        <span className="text-primary">Devjobs</span> has made it easier for <span className="text-primary">recruiter</span> to hire <span className="text-primary">developers</span>
                    </p>
                    <ButtonPrimary tw="mx-0" to="/signup">Sign Up</ButtonPrimary>
                </div>

            </div>
        </Container>
    )
}

export default LandingPage2;