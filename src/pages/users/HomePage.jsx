import React, { useEffect, useReducer } from 'react';
import tw from "twin.macro";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getJobs, jobApplication } from "services/api.service";
import { setAuthHeaders } from 'services/auth.service';
import { FiArrowRightCircle } from 'react-icons/fi';
import { Loader } from 'components';
import { useUserContext } from 'pages/UserContext';
import { getLocalJobs, setLocalJobs } from 'services/storage.service';
import { Pagination } from 'evergreen-ui';
import { paginateFunc, filterFunc } from 'utils/filters';

const Container = tw.div`w-full text-gray-800 bg-primary-lightest`;
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
const ApplyButtonLink = tw(Link)`block text-center w-full p-2 sm:py-1.5 rounded font-bold text-sm border border-primary bg-primary hocus:bg-green-700 text-primary-lightest mb-3`;
const DetailsButton = tw(Link)`block text-center w-full p-2 sm:py-1.5 rounded font-bold text-sm text-primary border border-primary hocus:bg-green-100`;
const Divider = tw.hr`mx-20 border-gray-300`;
const ApplyButton = tw.button`block w-full p-2 sm:py-1.5 rounded font-bold text-sm border border-primary bg-primary hocus:bg-green-700 text-primary-lightest mb-3`;
const RefreshButton = tw.button`px-12 py-3 mx-auto rounded-lg font-bold text-primary-lightest mt-5 bg-green-700`;

let cachedJobs = getLocalJobs();

let initialState = {
    jobs: cachedJobs || [],
    pageItems: [],
    page: 1,
    loading: false
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
        default:
            throw new Error();
    }
}

const LandingPage = () => {

    const { state } = useUserContext();
    const [lstate, ldispatch] = useReducer(reducer, initialState);
    const { jobs, page, pageItems, loading } = lstate;

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
    }

    const handleJobApplication = (pk) => {
        ldispatch({ type: "loading", payload: true });
        setAuthHeaders(state);
        jobApplication(pk)
            .then(response => {
                toast.success(response.data.request);
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
    }

    return (
        <Container>

            <JobNav>
                <JobNavTitle>Posted Jobs</JobNavTitle>
                <JobNavUl>
                    <JobNavLi
                        tw=" bg-green-100 text-green-700"
                        onClick={() => {
                            ldispatch({ type: "changePage", payload: (jobs?.length / 6) });
                            ldispatch({ type: "paginateJobs" });
                        }}
                    >
                        New Jobs
                    </JobNavLi>
                    <JobNavLi>|</JobNavLi>
                    <JobNavLi onClick={() => {
                        ldispatch({ type: "loading", payload: true })
                        ldispatch({ type: "filterJobs", payload: "1Week" })
                    }}
                    >
                        1 Week Ago
                    </JobNavLi>
                    <JobNavLi>|</JobNavLi>
                    <JobNavLi
                        onClick={() => {
                            ldispatch({ type: "loading", payload: true })
                            ldispatch({ type: "filterJobs", payload: "2Weeks" })
                        }}
                    >
                        2 Weeks Ago
                    </JobNavLi>
                    <JobNavLi>|</JobNavLi>
                    <JobNavLi
                        onClick={() => {
                            ldispatch({ type: "loading", payload: true })
                            ldispatch({ type: "filterJobs", payload: "1Month" })
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
                                <p tw="text-2xl mx-auto mb-2 font-bold text-secondary-lightest">Sorry there are no available jobs</p>
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
                                        {state.key && job.pk ? (
                                            <ApplyButton onClick={() => { handleJobApplication(job.pk) }}>Apply</ApplyButton>
                                        ) : (
                                            <ApplyButtonLink to="/login">Login To Apply</ApplyButtonLink>
                                        )}
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
            <p tw="text-center text-3xl text-green-700 font-bold cursor-pointer py-12 flex items-center justify-center" onClick={() => handleRefresh()}>See More Jobs &nbsp; <FiArrowRightCircle /></p>

        </Container>
    )
}

export default LandingPage;