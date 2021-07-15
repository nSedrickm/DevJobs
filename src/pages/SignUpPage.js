import React, { useState, useRef, Fragment } from "react";
import tw from "twin.macro";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser, setAuthHeaders } from "services/auth.service";
import { Dialog, Transition } from "@headlessui/react";
import { Loader } from "components";
import { useUserContext } from "pages/UserContext";

const Label = tw.label`block text-sm mt-2`;
const Input = tw.input`border border-green-600 w-full mt-2 mb-2 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const RadioInput = tw.input`border border-green-600 w-6 h-6 mr-4 rounded-full hocus:outline-none focus:ring-0 focus:border-green-600 text-green-600`;
const ErrorMessage = tw.p`text-sm text-red-500 mb-2`;

const SignupSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password1: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    password2: yup.string().min(8, 'Password must be at least 8 characters').required('Confirm Password is required')
        .oneOf([yup.ref('password1'), null], 'Password does not match'),
});


const SignUpPage = () => {
    const { dispatch } = useUserContext();
    const [isOpen, setIsOpen] = useState(false);
    const [stage, setStage] = useState(0);
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const finishButtonRef = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(SignupSchema)
    });

    const handleSignUp = (data) => {

        setLoading(true);

        registerUser(data)
            .then(response => {
                toast.success("Registration Successful");
                setAuthHeaders(response.data);
                setLoading(false);
                setStage(2);
                dispatch({ type: "LOGIN", payload: response.data })
                toast.success("A confirmation Email has been sent to your email address");
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if (error.response.status === 400) {
                        if (error.response.data.username) {
                            toast.error(error.response.data.username[0]);
                        }
                        else if (error.response.data.password1) {
                            toast.error(error.response.data.password1[0]);
                        }
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    toast.error("An error occurred Please check your network and try again");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error("An error occurred Please check your network and try again");
                }
                setLoading(false);
            });
    }

    if (loading) return <Loader />;


    if (stage === 2) {
        return (
            <section tw="mx-auto p-6 sm:w-2/3 my-16 md:my-24 sm:bg-white md:shadow-lg md:rounded-xl">
                <header tw="text-center mb-4">
                    <h1 tw="text-4xl text-green-600 mb-4 font-bold">DevJobs</h1>
                    <p tw="text-base font-medium">Please Let Us Know How You will Be Using Our Products</p>
                </header>
                <form tw="w-full md:w-2/3 lg:w-1/2 p-4 mx-auto">
                    <label
                        onClick={() => setRole("user")}
                        tw="w-full p-3 rounded-md mb-6 inline-flex items-center border border-green-600"
                    >
                        <RadioInput type="radio" name="role" />
                        <span>Job Seeker</span>
                    </label>

                    <label
                        onClick={() => setRole("employer")}
                        tw="w-full p-3 rounded-md mb-6 inline-flex items-center border border-green-600"
                    >
                        <RadioInput type="radio" name="role" />
                        <span>Employer</span>
                    </label>

                </form>
                <Link
                    to={role === "user" ? "/signup/user" : "/signup/employer"}
                    tw="block w-2/3 sm:w-1/3 mx-auto p-2 bg-green-600 text-center font-bold text-white rounded-md mb-8"
                >
                    Next
                </Link>
            </section>
        )
    }

    return (
        <Fragment>
            <section tw="text-secondary md:p-24">
                <div tw="mx-auto py-12 lg:mx-24 bg-white md:shadow-lg md:rounded-xl">
                    <header tw="text-center mb-4 p-4">
                        <h1 tw="text-5xl font-bold text-green-600 mb-2">DevJobs</h1>
                        <p tw="text-base">&lt; Ctrl + F Developer Jobs Faster / &gt;</p>
                    </header>
                    <div tw="flex flex-col md:flex-row">
                        {/* <div tw="w-full md:w-1/2 p-4 text-center">
                            <p tw="mb-8 text-lg font-bold">Sign Up With</p>
                            <button tw="p-2 rounded-md text-xl bg-gray-200 mb-5 w-5/6 md:w-2/3 mx-auto text-center">Google</button>
                            <button tw="p-2 rounded-md text-xl bg-blue-800 w-5/6 md:w-2/3 mx-auto text-white">facebook</button>
                            <p tw="text-green-600 my-4 text-sm">Terms & Privacy | cookie policy</p>
                        </div> */}
                        <div tw="w-full md:w-2/3 p-4 mx-auto">
                            <form tw="w-5/6 md:w-2/3 mx-auto" onSubmit={handleSubmit(handleSignUp)}>
                                <Label>Email</Label>
                                <Input type="email"
                                    placeholder="email@example.com"
                                    {...register("email")}
                                />
                                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                                <Label>Password</Label>
                                <Input
                                    type="password"
                                    name="password1"
                                    {...register("password1")}
                                />
                                {errors.password1 && <ErrorMessage>{errors.password1.message}</ErrorMessage>}

                                <Label>Confirm Password</Label>
                                <Input
                                    type="password"
                                    name="password2"
                                    {...register("password2")}
                                />
                                {errors.password2 && <ErrorMessage>{errors.password2.message}</ErrorMessage>}

                                <button type="submit" tw="w-full p-2 mt-4 bg-green-600 text-center font-bold text-white rounded-md">Sign Up</button>
                                <p tw="text-center my-4 mx-auto block">Already have an account <Link to="/login" tw="text-green-600 font-bold">Log In</Link></p>

                            </form>

                        </div>
                    </div>
                </div>
            </section>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto text-center"
                    initialFocus={finishButtonRef}
                    onClose={() => setIsOpen(false)}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-2xl p-8 text-center align-middle transition-all transform bg-white shadow-xl md:py-12 verflow-hidden rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl font-bold leading-6 text-primary"
                                >
                                    Registration Completed
                                </Dialog.Title>
                                <div className="my-8">
                                    <p className="text-lg text-secondary-light">
                                        welcome to a faster way of applying for jobs with just two clicks
                                    </p>

                                    <Link
                                        ref={finishButtonRef}
                                        to="/login"
                                        tw="inline-flex justify-center items-center bg-primary text-white w-1/2 lg:w-1/3 rounded-md px-8 py-3 mt-8"
                                    >
                                        Finish
                                    </Link>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

        </Fragment>
    )

}

export default SignUpPage;