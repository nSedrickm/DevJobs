import React, { useReducer } from "react";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Input = tw.input`border border-green-600 w-full mt-2 mb-2 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const ErrorMessage = tw.p`text-sm text-red-500 mb-2`;
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

const SignupSchema = yup.object().shape({
    username: yup.string().required('UserName is required'),
    password1: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    password2: yup.string().min(8, 'Password must be at least 8 characters').required('Confirm Password is required')
    .oneOf([yup.ref('password1'), null], 'Password does not match'),
});


const SignUpPage = () => {

    const [state, dispatch] = useReducer(reducer, {
        stage: 1,
        loading: false
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(SignupSchema)
    });
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        dispatch({ type: "changeStage", payload: 2 });
    };

    if (state.stage === 2) {
        return (
            <section tw="text-gray-600 md:p-24 h-screen">
                <div tw="mx-auto p-12 lg:mx-36 bg-white md:shadow-lg md:rounded-xl">
                    <header tw="text-center mb-8 p-8">
                        <p tw="text-base mb-2">Step 1 Of 9</p>
                        <h1 tw="text-2xl text-green-600 mb-4 font-bold">Confirm Your Email Address</h1>
                        <p tw="text-lg">A Link Has Been Sent To Your Email Address Used To Register. Please Click The Link To Continue</p>
                    </header>
                    <div tw="text-center">
                        <Link to="/" tw=" px-8 py-2 mx-2 border border-green-600 hocus:bg-green-100 text-green-600 text-center font-bold rounded-md">Back</Link>
                        <Link to="/role" tw=" px-8 py-2 mx-2 bg-green-600  text-center font-bold text-white rounded-md">Next</Link>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section tw="text-gray-600 md:p-24">
            <div tw="mx-auto py-12 lg:mx-24 bg-white md:shadow-lg md:rounded-xl">
                <header tw="text-center mb-8 p-4">
                    <h1 tw="text-4xl font-bold text-green-600 mb-2">DevJobs</h1>
                    <p tw="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </header>
                <div tw="flex flex-col md:flex-row">
                    <div tw="w-full md:w-1/2 p-4 text-center">
                        <p tw="mb-8 text-lg font-bold">Sign Up  With</p>
                        <button tw="p-2 rounded-md text-xl bg-gray-200 mb-5 w-5/6 md:w-2/3 mx-auto text-center">Google</button>
                        <button tw="p-2 rounded-md text-xl bg-blue-800 w-5/6 md:w-2/3 mx-auto text-white">facebook</button>
                        <p tw="text-green-600 my-4 text-sm">Terms & Privacy | cookie policy</p>
                    </div>
                    <div tw="w-full md:w-1/2 p-4">
                        <form tw="w-5/6 md:w-2/3 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                            <label tw="block text-sm mt-2">User Name</label>
                            <Input
                                type="text"
                                placeholder="johndoe"
                                {...register("username")}

                            />
                            {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
                            {/* <label tw="block text-sm mt-2">Email</label>
                            <Input type="text" placeholder="email@example.com" /> */}

                            <label tw="block text-sm mt-2">Password</label>
                            <Input
                                type="password"
                                name="password1"
                                {...register("password1")}
                            />
                            {errors.password1 && <ErrorMessage>{errors.password1.message}</ErrorMessage>}

                            <label tw="block text-sm mt-2">Confirm Password</label>
                            <Input
                                type="password"
                                name="password2"
                                {...register("password2")}
                            />
                            {errors.password2 && <ErrorMessage>{errors.password2.message}</ErrorMessage>}

                            <button type="submit" tw="w-full p-2 mt-4 bg-green-600 text-center font-bold text-white rounded-md">Sign Up</button>
                            <p tw="text-center my-4 mx-auto block">Already have an account <Link to="/users/login" tw="text-green-600 font-bold">Sign In</Link></p>

                        </form>

                    </div>
                </div>
            </div>
        </section>
    )

}

export default SignUpPage;