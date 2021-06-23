import React, { useReducer } from "react";
import tw from "twin.macro";
import { Link } from "react-router-dom";
const Input = tw.input`border border-green-600 w-full mt-2 mb-4 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const RadioInput = tw.input`border border-green-600 w-6 h-6 mr-4 rounded-full hocus:outline-none focus:ring-0 focus:border-green-600 text-green-600`;

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

const SignUpPage = () => {

    const [state, dispatch] = useReducer(reducer, {
        stage: 1,
        loading: false
    });

    if (state.stage === 2) {
        return (
            <section tw="text-gray-600 lg:h-screen bg-white md:bg-gray-100">
                <div tw="mx-auto py-12 md:p-24 md:m-24 lg:mx-36 bg-white md:shadow-lg md:rounded-xl">
                    <header tw="text-center mb-8 p-8">
                        <p tw="text-base mb-2">Step 1 Of 9</p>
                        <h1 tw="text-2xl text-green-600 mb-4 font-bold">Confirm Your Email Address</h1>
                        <p tw="text-lg">A Link Has Been Sent To Your Email Address Used To Register. Please Click The Link To Continue</p>
                    </header>
                    <div tw="text-center">
                        <button onClick={() => dispatch({ type: "changeStage", payload: 1 })} tw=" px-8 py-2 mx-2 border border-green-600 hocus:bg-green-100 text-green-600 text-center font-bold rounded-md">Back</button>
                        <button onClick={() => dispatch({ type: "changeStage", payload: 3 })} tw=" px-8 py-2 mx-2 bg-green-600  text-center font-bold text-white rounded-md">Next</button>
                    </div>
                </div>
            </section>
        )
    }

    if (state.stage === 3) {
        return (
            <section tw="text-gray-600 lg:h-screen bg-white md:bg-gray-100">
                <div tw="mx-auto py-12 md:m-24 lg:mx-36 bg-white md:shadow-lg md:rounded-xl">
                    <header tw="text-center mb-8 p-4">
                        <p tw="text-base mb-2">Step 2 Of 9</p>
                        <h1 tw="text-4xl font-bold text-green-600 mb-2">DevJobs</h1>
                        <p tw="text-base">Let Us Know How You will Be Using Our Products</p>
                    </header>
                    <div tw="flex flex-col md:flex-row">
                        <div tw="w-full md:w-1/2 p-8 mx-auto">
                            <form>
                                <label tw="w-full p-3 rounded-md mb-6 inline-flex items-center border border-green-600">
                                    <RadioInput type="radio" name="role" />
                                    <span>Job Seeker</span>
                                </label>

                                <label tw="w-full p-3 rounded-md mb-6 inline-flex items-center border border-green-600">
                                    <RadioInput type="radio" name="role" />
                                    <span>Employer</span>
                                </label>

                                <button onClick={() => dispatch({ type: "changeStage", payload: 4 })} tw="w-full p-3 bg-green-600 text-center font-bold text-white rounded-md">Next</button>

                            </form>

                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section tw="text-gray-600 lg:h-screen bg-white md:bg-gray-100">
            <div tw="mx-auto py-12 md:m-24 lg:mx-36 bg-white md:shadow-lg md:rounded-xl">
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
                        <form tw="w-5/6 md:w-2/3 mx-auto">
                            <label tw="block text-green-600 text-sm">User Name</label>
                            <Input type="text" placeholder="johndoe" />

                            <label tw="block text-green-600 text-sm">Email</label>
                            <Input type="text" placeholder="email@example.com" />

                            <label tw="block text-green-600 text-sm">Password</label>
                            <Input type="password" />

                            <label tw="block text-green-600 text-sm">Confirm Password</label>
                            <Input type="password" />

                            <button onClick={() => dispatch({ type: "changeStage", payload: 2 })} tw="w-full p-2 bg-green-600 text-center font-bold text-white rounded-md">Sign Up</button>
                            <small tw="text-center my-4 mx-auto block">Already have an account <Link to="/login" tw="text-green-600 font-bold">Sign In</Link></small>

                        </form>

                    </div>
                </div>
            </div>
        </section>
    )

}

export default SignUpPage;