import React, { useEffect, useState } from 'react';
import tw from "twin.macro";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setAuthHeaders } from 'services/auth.service';
import { getJobDetails, updateJob, deleteJob } from "services/api.service";
import { Loader } from 'components';
import { useParams, useHistory } from 'react-router-dom';
import { FiArrowLeftCircle, FiEdit3 } from 'react-icons/fi';
import { useUserContext } from 'pages/UserContext';
import { Dialog } from 'evergreen-ui';

const Container = tw.div`w-full text-gray-800 bg-white p-8 md:p-12`;
const Header = tw.div`text-center md:h-64 md:relative bg-green-100 p-8 rounded-lg`;
const Heading = tw.h1`text-green-600 text-3xl font-bold`;
const Description = tw.p`text-lg tracking-wide text-gray-700`;
const JobNav = tw.nav`text-center md:text-left flex items-center justify-center`;
const JobNavUl = tw.ul`md:inline-flex items-center`;
const JobNavLi = tw.li`text-sm lg:text-base cursor-pointer px-2 py-1 lg:px-4 lg:py-2  mb-2 text-gray-500`;
const Divider = tw.span`hidden md:inline-flex px-2 py-1 lg:px-4 lg:py-2 text-green-600 mb-2`;
const Input = tw.input`border border-primary w-full my-2 p-1.5 px-8 rounded-md bg-opacity-90 hocus:outline-none focus:ring-primary focus:border-primary`;
const Label = tw.label`block text-sm`;
const TextArea = tw.textarea`w-full rounded mt-2 mb-2 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const ErrorMessage = tw.p`text-sm text-red-500 mb-2`;
const SubmitButton = tw.button`block w-full md:w-2/3 mx-auto p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2`;

const JobSchema = yup.object().shape({
    company_name: yup.string().required('Company Name is required'),
    company_email: yup.string().email("Please enter a valid email address").required('Email is required'),
    company_website: yup.string().required('Website address is required'),
    country: yup.string().required('Country is required'),
    state: yup.string().required(),
    city: yup.string().required('City is Required'),
    title: yup.string().required('Title is Required'),
    description: yup.string().required('Please provide a job description'),
    experience_level: yup.string(),
    expected_salary: yup.string().required('Please enter an expected salary'),
    closing_date: yup.string().required('Please Enter a closing date')
});


const EmployerJobDetails = () => {
    const { state } = useUserContext();
    const [details, setdetails] = useState({})
    const [loading, setLoading] = useState(true);
    const [isShown, setIsShown] = useState(false);
    const { pk } = useParams()
    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(JobSchema)
    });

    useEffect(() => {
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
                    // The requestcreateJoest` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    toast.error("An error occured, could not get details please check your network and try again")
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error("An error occured, could not get details please check your network and try again")
                }
                setLoading(false);
            });
    }, [pk]);


    const handleUpdateJob = (data) => {

        setLoading(true)
        data.closing_date = (new Date(data.closing_date).toISOString());
        data.pk = pk;
        setAuthHeaders(state);
        updateJob(data)
            .then(response => {
                toast.success("Job Updated succesfully");
                setIsShown(false);
                window.location.reload();
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

    const handleDeleteJob = () => {
        setLoading(true)
        setAuthHeaders(state);
        deleteJob(pk)
            .then(response => {
                toast.success("Job deleted succesfully");
                window.location.replace("/employer/activejobs")
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


    if (loading) return <Loader className="text-gray-600 bg-white" />;

    return (
        <>
            <Container>
                <div className="flex items-center mb-2 cursor-pointer" onClick={() => history.goBack()}>
                    <FiArrowLeftCircle size={24} /> &nbsp; Back
                </div>
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

                <div className="flex flex-col justify-center mb-12 md:flex-row">

                    <button
                        onClick={() => setIsShown(true)}
                        className="inline-flex items-center justify-center px-8 py-2 mr-2 text-white border rounded-md bg-primary">
                        Update
                    </button>
                    <button
                        onClick={() => handleDeleteJob()}

                        className="inline-flex items-center justify-center px-8 py-2 text-white border rounded-md bg-danger">
                        Delete
                    </button>
                </div>
            </Container>

            <Dialog
                isShown={isShown}
                hasFooter={false}
                onCloseComplete={() => setIsShown(false)}
            >
                <>
                    <header tw="w-full flex justify-center items-center my-4">
                        <FiEdit3 size={36} tw="mr-4 text-green-600" />
                        <h1 tw="text-2xl  font-bold ">Update Job</h1>
                    </header>
                    <form
                        tw="w-full mx-auto mb-12"
                        onSubmit={handleSubmit(handleUpdateJob)}
                    >
                        <div tw="p-4 sm:p-8 mb-8 bg-white">
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                placeholder="Company"
                                defaultValue={details?.company_name}
                                {...register("company_name")}
                            />
                            {errors.company_name && <ErrorMessage>{errors.company_name.message}</ErrorMessage>}

                            <Label>Company Email</Label>
                            <Input
                                type="email"
                                placeholder="email@company.com"
                                defaultValue={details?.company_email}
                                {...register("company_email")}
                            />
                            {errors.company_email && <ErrorMessage>{errors.company_email.message}</ErrorMessage>}


                            <Label>Website Link</Label>
                            <Input
                                type="text"
                                placeholder="https://company.com"
                                defaultValue={details?.company_website}
                                {...register("company_website")}
                            />
                            {errors.company_website && <ErrorMessage>{errors.company_website.message}</ErrorMessage>}

                            <Label>Job Title</Label>
                            <Input
                                type="text"
                                placeholder="job title"
                                defaultValue={details?.title}
                                {...register("title")}
                            />

                            <Label>Description</Label>
                            <TextArea
                                rows="3"
                                defaultValue={details?.description}
                                {...register("description")}>
                            </TextArea>
                            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

                            <Label>Country</Label>
                            <Input
                                type="text"
                                placeholder="Country"
                                defaultValue={details?.country}
                                {...register("country")}
                            />
                            {errors.country && <ErrorMessage>{errors.country.message}</ErrorMessage>}

                            <Label>State</Label>
                            <Input

                                type="text"
                                placeholder="State"
                                defaultValue={details?.state}
                                {...register("state")}
                            />
                            {errors.state && <ErrorMessage>{errors.state.message}</ErrorMessage>}

                            <Label>City</Label>
                            <Input
                                type="text"
                                placeholder="City"
                                defaultValue={details?.state}
                                {...register("city")}
                            />
                            {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}

                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                placeholder="2 years"
                                defaultValue={details?.experience_level}

                                {...register("experience_level")}
                            />
                            {errors.experience_level && <ErrorMessage>{errors.experience_level.message}</ErrorMessage>}

                            <Label>Expected Salary</Label>
                            <Input
                                type="number"
                                placeholder="250000"
                                defaultValue={details?.expected_salary}
                                {...register("expected_salary")}
                            />
                            {errors.expected_salary && <ErrorMessage>{errors.expected_salary.message}</ErrorMessage>}

                            <Label>Closing Date</Label>
                            <Input
                                type="date"
                                defaultValue={new Date(details?.closing_date).toISOString().substr(0, 10)}
                                {...register("closing_date")}
                            />
                            {errors.closing_date && <ErrorMessage>{errors.closing_date.message}</ErrorMessage>}
                        </div>

                        <SubmitButton type="submit"> Update Job</SubmitButton>
                    </form>
                </>
            </Dialog>

        </>
    )
}

export default EmployerJobDetails;
