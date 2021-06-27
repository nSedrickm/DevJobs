import React, { useEffect, useState } from 'react';
import tw from "twin.macro";
import toast from "react-hot-toast";
import { getDashboard, createJob } from "services/api.service";
import { FiPlusCircle, FiRefreshCcw } from 'react-icons/fi';
import { UserNavbar, Footer, Loader } from 'components';
import { Dialog } from "evergreen-ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setAuthHeaders } from 'services/auth.service';
import { useUserContext } from './UserContext';


const Container = tw.div`w-full text-gray-800`;
const InlineLoader = tw(props => <Loader {...props} />)``;

const JobContainer = tw.div`p-4 sm:p-12 lg:p-20 justify-center grid md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center place-content-center`;
const JobNav = tw.nav`px-4 sm:px-8 pt-20 pb-10 lg:px-20 text-center md:text-left flex flex-col items-center justify-center lg:flex-row lg:justify-between`;
const JobNavTitle = tw.h2`font-bold text-2xl mb-8 lg:mb-0`;
const JobNavUl = tw.ul`inline-flex items-center`;
const JobNavLi = tw.li`inline-flex items-center font-semibold text-sm sm:text-base cursor-pointer px-4 py-2 mx-2 bg-green-100 text-green-700 rounded shadow`;
const JobCard = tw.div`p-5 mx-auto w-full border rounded-xl shadow-lg  bg-white text-gray-500 border hover:border-green-600 hover:shadow-none`;
const JobCardTitle = tw.h3`font-bold text-xl mb-4 text-gray-700`;
const JobCardBody = tw.div`mb-4`;
const JobMeta = tw.div`flex flex-row md:inline-flex text-sm lg:text-base py-2`;
const Divider = tw.hr`mx-20 border-gray-300`;
const Label = tw.label`block text-sm`;
const Input = tw.input`border border-gray-600 w-full mt-2 mb-4 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const TextArea = tw.textarea`w-full rounded mt-2 mb-2 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const ErrorMessage = tw.p`text-sm text-red-500 mb-2`;
const SubmitButton = tw.button`block w-full md:w-2/3 mx-auto p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2`;

const JobSchema = yup.object().shape({
    company_number: yup.string().required('Company Number is required'),
    company_name: yup.string().required('Company Name is required'),
    company_email: yup.string().email("Please enter a valid email address").required('Email is required'),
    company_website: yup.string().required('Website address is required'),
    country: yup.string().required('Country is required'),
    state: yup.string().required(),
    city: yup.string().required('City is Required'),
    title: yup.string().required('Title is Required'),
    description: yup.string().required('Please provide a job description'),
    experience_level: yup.string(),
});

const Dashboard = () => {

    const { state } = useUserContext();
    const [jobs, setJobs] = useState({})
    const [loading, setLoading] = useState(true);
    const [isShown, setIsShown] = React.useState(false)

    useEffect(() => {
        setAuthHeaders(state)
        getDashboard()
            .then(response => {
                setJobs(response.data);
                console.log(response.data);
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
    }, [state]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(JobSchema)
    });

    const handleCreateJob = (data) => {
        setLoading(true)
        setAuthHeaders(state)
        createJob(data)
            .then(response => {
                toast.success("Job posted succesfully");
                console.log(response.data)
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("An error occurred Please check your network and try again");

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http16000.ClientRequest in node.js
                    toast.error("An error occurred Please check your network and try again");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error("An error occurred Please check your network and try again");
                }
                setLoading(false);

            });
    }


    const handleRefresh = () => {
        setLoading(true);
        getDashboard()
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
        <Container>
            <UserNavbar />
            <JobNav>
                <JobNavTitle>Employer Dashboard</JobNavTitle>
                <JobNavUl>
                    <JobNavLi onClick={() => setIsShown(true)}><FiPlusCircle /> &nbsp; New Job</JobNavLi>
                    <JobNavLi onClick={() => handleRefresh()} ><FiRefreshCcw /> &nbsp; Refresh</JobNavLi>
                </JobNavUl>
            </JobNav>

            <Divider />


            <JobContainer>
                {loading ? (
                    <InlineLoader tw="h-96 md:col-span-2 lg:col-span-3" />
                ) : (
                    <>
                        <JobNavTitle tw="col-span-3 text-left">All Applications</JobNavTitle>

                        {jobs.length && (
                            jobs?.map(job => {
                                return (
                                    <JobCard key={job.pk} >
                                        <JobCardBody>
                                            <JobCardTitle>{job.title}</JobCardTitle>
                                            <JobMeta>
                                                <p>PK : {job.pk}</p>
                                            </JobMeta>
                                        </JobCardBody>
                                    </JobCard>
                                )
                            }))}
                    </>
                )}
            </JobContainer>

            <Dialog
                isShown={isShown}
                title="Add Job"
                hasFooter={false}
                onCloseComplete={() => setIsShown(false)}
            >
                <>
                    <header tw="w-full flex justify-center items-center my-4">
                        <FiPlusCircle size={24} tw="mr-4 text-green-600" />
                        <h1 tw="text-2xl  font-bold ">Post New Job</h1>
                    </header>
                    <form
                        tw="w-full mx-auto mb-12"
                        onSubmit={handleSubmit(handleCreateJob)}
                    >
                        <div tw="p-4 sm:p-8 mb-8 bg-white">
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                placeholder="John Doe"
                                {...register("company_name")}
                            />
                            {errors.company_name && <ErrorMessage>{errors.company_name.message}</ErrorMessage>}

                            <Label>Company Email</Label>
                            <Input
                                type="email"
                                placeholder="email@company.com"
                                {...register("company_email")}
                            />
                            {errors.company_email && <ErrorMessage>{errors.company_email.message}</ErrorMessage>}

                            <Label>Company Identification Number</Label>
                            <Input
                                type="text"
                                placeholder="CMN-12303NGN"
                                {...register("company_number")}
                            />
                            {errors.company_number && <ErrorMessage>{errors.company_number.message}</ErrorMessage>}

                            <Label>Website Link</Label>
                            <Input
                                type="text"
                                placeholder="https://company.com"
                                {...register("company_website")}
                            />
                            {errors.company_website && <ErrorMessage>{errors.company_website.message}</ErrorMessage>}

                            <Label>Job Title</Label>
                            <Input
                                type="text"
                                placeholder="job title"
                                {...register("title")}
                            />
                            {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

                            <Label>Description</Label>
                            <TextArea
                                rows="3"
                                {...register("description")}>
                            </TextArea>
                            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

                            <Label>Country</Label>
                            <Input
                                type="text"
                                placeholder="Country"
                                {...register("country")}
                            />
                            {errors.country && <ErrorMessage>{errors.country.message}</ErrorMessage>}

                            <Label>State</Label>
                            <Input
                                type="text"
                                placeholder="State"
                                {...register("state")}
                            />
                            {errors.state && <ErrorMessage>{errors.state.message}</ErrorMessage>}

                            <Label>City</Label>
                            <Input
                                type="text"
                                placeholder="City"
                                {...register("city")}
                            />
                            {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}

                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                placeholder="2 years"
                                {...register("experience_level")}
                            />
                            {errors.experience_level && <ErrorMessage>{errors.experience_level.message}</ErrorMessage>}

                            <Label>Expected Salary</Label>
                            <Input
                                type="number"
                                placeholder="250000"
                            />
                            {errors.expected_salary && <ErrorMessage>{errors.expected_salary.message}</ErrorMessage>}
                        </div>

                        <SubmitButton>Next</SubmitButton>
                    </form>
                </>
            </Dialog>
            <Footer />
        </Container>
    )
}

export default Dashboard;