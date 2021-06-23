import React, { useReducer } from "react";
import tw from "twin.macro";
import { Link } from "react-router-dom";

const Input = tw.input`border border-green-600 w-full mt-2 mb-4 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;

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

const PasswordResetPage = () => {

    const [state, dispatch] = useReducer(reducer, {
        stage: 1,
        loading: false
    });

    if (state.stage === 2) {
        return (
            <section tw="text-gray-600 lg:h-screen bg-white md:bg-gray-100">
                <div tw="mx-auto py-12 md:p-24 md:m-24 lg:mx-36 bg-white md:shadow-lg md:rounded-xl">
                    <header tw="text-center p-8">
                        <h1 tw="text-2xl text-green-600 mb-4 font-bold">Email Confirmation Code Sent</h1>
                        <p tw="text-base">Enter the reset code sent to your email</p>
                    </header>
                    <div tw="w-full md:w-1/2 mx-auto">
                        <form>
                            <label tw="block text-green-600">Reset Code</label>
                            <Input type="text" />

                            <button onClick={() => dispatch({ type: "changeStage", payload: 3 })} tw="w-full p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2">Next</button>
                        </form>

                    </div>
                </div>
            </section>
        )
    }

    if (state.stage === 3) {
        return (
            <section tw="text-gray-600 lg:h-screen bg-white md:bg-gray-100">
                <div tw="mx-auto py-12 md:p-24 md:m-24 lg:mx-36 bg-white md:shadow-lg md:rounded-xl">
                    <header tw="text-center p-8">
                        <h1 tw="text-2xl text-green-600 mb-4 font-bold">Email Confirmation Code Sent</h1>
                        <p tw="text-base">Enter the reset code sent to your email</p>
                    </header>
                    <div tw="w-full md:w-1/2 mx-auto">
                        <form>
                            <label tw="block">Password</label>
                            <Input type="text" />

                            <label tw="block">Confirm Password</label>
                            <Input type="text" />

                            <Link to="/login" tw="block w-full p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2">Reset</Link>
                        </form>

                    </div>
                </div>
            </section>
        )
    }

    return (
        <section tw="text-gray-600 lg:h-screen bg-white md:bg-gray-100">
            <div tw="mx-auto py-12 md:p-24 md:m-24 lg:mx-36 bg-white md:shadow-lg md:rounded-xl">
                <header tw="text-center p-8">
                    <h1 tw="text-2xl text-green-600 mb-4 font-bold">Enter Your Email Address</h1>
                    <p tw="text-base">A password reset code will be sent to your email</p>
                </header>
                <div tw="w-full md:w-1/2 mx-auto">
                    <form>
                        <label tw="block text-green-600">Email</label>
                        <Input type="email" placeholder="user@example.com" />

                        <button onClick={() => dispatch({ type: "changeStage", payload: 2 })} tw="w-full p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2">Send Code</button>
                    </form>

                </div>
            </div>
        </section>
    )

}

export default PasswordResetPage;