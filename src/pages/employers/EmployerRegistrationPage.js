import React, { useReducer } from "react";
import tw from "twin.macro";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BsBuilding } from "react-icons/bs";
import { createEmployerProfile, setAuthHeaders } from "services/auth.service";
import { Loader } from "components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUserContext } from "pages/UserContext";

const Label = tw.label`block text-sm`;
const Input = tw.input`border border-gray-600 w-full mt-2 mb-4 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;

const ErrorMessage = tw.p`text-sm text-red-500 mb-2`;
const SubmitButton = tw.button`block w-full md:w-2/3 mx-auto p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2`;

const CompanyDetailsSchema = yup.object().shape({
    company_name: yup.string().required('Company Name is required'),
    company_email: yup.string().email("Please enter a valid email address").required('Email is required'),
    company_website: yup.string().required('Website address is required'),
    company_number: yup.string().required('Company Number is required'),
    company_linkedin: yup.string(),

});

const reducer = (state, action) => {
    switch (action.type) {
        case 'changeStage':
            return {
                ...state,
                stage: action.payload
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

const EmployerRegistrationPage = () => {

    const { state, handleLogOut } = useUserContext();

    const [lstate, dispatch] = useReducer(reducer, {
        stage: 3,
        loading: false
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(CompanyDetailsSchema)
    });

    const handleCreateEmployerProfile = (data) => {
        dispatch({ type: "loading", payload: true });
        setAuthHeaders(state);
        createEmployerProfile(data)
            .then(response => {
                toast.success("Employer Profile Created Successfully");
                dispatch({ type: "loading", payload: false })
                dispatch({ type: "changeStage", payload: 4 })
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if (error.response.status === 500) {
                        toast.error("Sorry this company already exists. Please create another");
                    } else {
                        toast.error("An error occurred Please check your network and try again");
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http16000.ClientRequest in node.js
                    toast.error("An error occurred Please check your network and try again");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error("An error occurred Please check your network and try again");
                }
                dispatch({ type: "loading", payload: false })

            });
    }

    if (lstate.loading) return <Loader />

    // after developer completes registeration you can sign them in auto or redirect to login page
    // on signin display employer dashboard

    if (lstate.stage === 4) {
        return (
            <section tw="text-gray-600 bg-white md:bg-gray-100 md:py-24">
                <div tw="mx-auto py-12 md:w-2/3 my-24  bg-white md:shadow-lg md:rounded-xl">
                    <header tw="text-center mb-4 p-8">
                        <h1 tw="text-3xl text-green-600 mb-4 font-bold">Registration Completed</h1>
                        <p tw="text-base font-medium">Welcome to a better hiring experience</p>
                    </header>
                    <Link onClick={() => handleLogOut()}
                        to="/home" tw="block w-2/3 sm:w-1/4 mx-auto p-2 bg-green-600  text-center font-bold text-white rounded-md">Finish</Link>
                </div>
            </section>
        )
    }

    return (
        <section tw="text-gray-600 bg-white md:bg-gray-100 p-8">
            <div tw="mx-auto py-12 mb-12">
                <header tw="text-center">
                    <h1 tw="text-3xl text-green-600 mb-4 font-bold">Employer Profile</h1>
                    <p tw="text-base">We Need These Details To Approve Jobs Posted  </p>
                    <ul tw="hidden md:inline-flex items-center text-sm md:text-base font-semibold mt-8">
                        <li
                            className={lstate.stage === 3 && "text-green-600"}
                            tw="px-4 py-1 mx-2"
                        >
                            Company Details
                        </li>
                    </ul>
                </header>

                <hr tw="mx-40 my-8 border border-gray-300" />

                <p tw="mb-2 text-center">Step <span tw="font-bold">{lstate.stage}</span> Of 4</p>

                {lstate.stage === 3 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <BsBuilding size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-2xl  font-bold ">Company Details</h1>
                        </header>
                        <form
                            tw="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto"
                            onSubmit={handleSubmit(handleCreateEmployerProfile)}
                        >
                            <div tw="p-4 sm:p-6 mb-8 bg-white md:shadow-lg md:rounded-xl">
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
                                    placeholder="CPN-234"
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

                                <Label>LinkedIn</Label>
                                <Input
                                    type="text"
                                    placeholder="https://linkedin.com/company"
                                    {...register("company_linkedin")}
                                />
                                {errors.company_website && <ErrorMessage>{errors.company_website.message}</ErrorMessage>}
                            </div>

                            <SubmitButton>Next</SubmitButton>
                        </form>
                    </>
                )}


            </div>
        </section>
    )

}

export default EmployerRegistrationPage;