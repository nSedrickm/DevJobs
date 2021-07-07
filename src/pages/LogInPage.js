import React from "react";
import tw from "twin.macro";
import toast from "react-hot-toast";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userLogin, setAuthHeaders } from "services/auth.service";
import { useUserContext } from "./UserContext";

const Label = tw.label`block text-sm mt-2`;
const Input = tw.input`border border-green-600 w-full mt-2 mb-2 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const ErrorMessage = tw.p`text-sm text-red-500 mb-2`;

const LogInSchema = yup.object().shape({
    email: yup.string().email().required('Please enter a valid email address'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const LogInPage = () => {

    const { dispatch, setLoading } = useUserContext();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(LogInSchema)
    });

    const handleLogIn = (data) => {

        setLoading(true);

        userLogin(data)
            .then(response => {
                toast.success("Login Successful");
                setAuthHeaders(response.data);
                setLoading(false);
                dispatch({ type: "LOGIN", payload: response.data })
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if (error.response.status === 400) {
                        if (error.response.data.non_field_errors) {
                            toast.error("Wrong username or password provided");
                        }
                        else if (error.response.data.password1) {
                            toast.error("An error occurred Please check your network and try again");
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

    return (
        <section tw="text-gray-600 md:p-24 lg:h-screen">
            <div tw="mx-auto py-12 lg:mx-24 bg-white md:shadow-lg md:rounded-xl">
                <header tw="text-center mb-4 p-4">
                    <h1 tw="text-5xl font-bold text-green-600 mb-2">DevJobs</h1>
                    <p tw="text-base">&lt; Ctrl + F Developer Jobs Faster / &gt;</p>
                </header>
                <div tw="flex flex-col md:flex-row">
                    {/* <div tw="w-full md:w-1/2 p-4 text-center">
                        <p tw="mb-8 text-lg font-bold">Sign In With</p>
                        <button tw="p-2 rounded-md text-xl bg-gray-200 mb-5 w-5/6 md:w-2/3 mx-auto text-center">Google</button>
                        <button tw="p-2 rounded-md text-xl bg-blue-800 w-5/6 md:w-2/3 mx-auto text-white">facebook</button>
                        <p tw="text-green-600 my-4 text-sm">Terms & Privacy | cookie policy</p>
                    </div> */}
                    <div tw="w-full md:w-2/3 p-4 mx-auto">
                        <form tw="w-5/6 md:w-2/3 mx-auto" onSubmit={handleSubmit(handleLogIn)}>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email@example.com"
                                {...register("email")}
                            />
                            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                {...register("password")}
                            />
                            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}


                            <button tw="w-full p-2 mt-4 bg-green-600 text-center font-bold text-white rounded-md">Sign In</button>

                            <Link to="/reset-password" tw="text-green-600 my-6 block text-center">Forgot Password</Link>

                            <p tw="text-center my-4 mx-auto block">Dont Have An Account Yet?  <Link to="/signup" tw="text-green-600 font-bold">Sign Up</Link></p>

                        </form>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default LogInPage;