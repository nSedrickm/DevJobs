import React from "react";
import tw from "twin.macro";
import { Link } from "react-router-dom";
const Input = tw.input`border border-green-600 w-full mt-2 mb-4 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;

const LogInPage = () => {
    return (
        <section tw="text-gray-600 lg:h-screen bg-white md:bg-gray-100">
            <div tw="mx-auto py-12 md:m-24 lg:mx-36 bg-white md:shadow-lg md:rounded-xl">
                <header tw="text-center mb-8 p-4">
                    <h1 tw="text-4xl font-bold text-green-600 mb-2">DevJobs</h1>
                    <p tw="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </header>
                <div tw="flex flex-col md:flex-row">
                    <div tw="w-full md:w-1/2 p-4 text-center">
                        <p tw="mb-8 text-lg font-bold">Sign In With</p>
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

                            <button tw="w-full p-2 bg-green-600 text-center font-bold text-white rounded-md">Sign In</button>

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