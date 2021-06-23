import React, { useState } from "react";
import tw from "twin.macro";
import { Link } from "react-router-dom";

const RadioInput = tw.input`border border-green-600 w-6 h-6 mr-4 rounded-full hocus:outline-none focus:ring-0 focus:border-green-600 text-green-600`;

const RoleSelectPage = () => {

    const [role, setRole] = useState("");
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
                            <label
                                onClick={() => setRole("job-seeker")}
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

                            <Link
                                to={role === "job-seeker" ? "/job-seeker" : "/employer"}
                                tw="block p-3 bg-green-600 text-center font-bold text-white rounded-md"
                            >
                                Next
                            </Link>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RoleSelectPage;