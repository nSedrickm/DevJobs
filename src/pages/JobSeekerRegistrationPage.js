import React, { useReducer } from "react";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { BsArrowRight, BsPeopleCircle } from "react-icons/bs";
import { GrStackOverflow } from "react-icons/gr";
import { ImLocation2 } from "react-icons/im";

const Input = tw.input`border border-gray-600 w-full mt-2 mb-4 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const Select = tw.select`border border-gray-600 w-full mt-2 mb-4 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const TextArea = tw.textarea`w-full rounded-lg mb-6 hocus:outline-none focus:ring-green-600 focus:border-green-600`;

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

const JobSeekerRegistrationPage = () => {

    const [state, dispatch] = useReducer(reducer, {
        stage: 3,
        loading: false
    });


    // after developer completes registeration you can sign them in auto or redirect to login page
    // on signin display homepage
    if (state.stage === 9) {
        return (
            <section tw="text-gray-600 bg-white md:bg-gray-100">
                <div tw="mx-auto py-12 md:w-2/3 my-24 md:my-48 bg-white md:shadow-lg md:rounded-xl">
                    <header tw="text-center mb-4 p-8">
                        <h1 tw="text-3xl text-green-600 mb-4 font-bold">Registration Completed</h1>
                        <p tw="text-base font-medium">welcome to a faster way of applying for jobs with just two clicks</p>
                    </header>
                    <div tw="text-center">
                        <Link to="/login" tw="block w-2/3 md:w-1/3 mx-auto p-2 bg-green-600  text-center font-bold text-white rounded-md">Next</Link>
                    </div>
                </div>
            </section>
        )
    }


    return (
        <section tw="text-gray-600  bg-white md:bg-gray-100  p-8">
            <div tw="mx-auto py-12 mb-12">
                <header tw="text-center">
                    <h1 tw="text-3xl text-green-600 mb-4 font-bold">Job Seeker Profile</h1>
                    <p tw="text-base">We Need These Details To Help You Get Jobs Related To Your Profile</p>
                    <ul tw="hidden md:inline-flex items-center text-sm md:text-base font-semibold mt-8">
                        <li onClick={() => dispatch({ type: "changeStage", payload: 3 })}
                            className={state.stage === 3 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Personal
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 4 })}
                            className={state.stage === 4 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Contact
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 5 })}
                            className={state.stage === 5 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Stack / Role
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 6 })}
                            className={state.stage === 6 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Location
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 7 })}
                            className={state.stage === 7 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            About Me
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 8 })}
                            className={state.stage === 8 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Cv / Resume
                        </li>
                    </ul>
                </header>

                <hr tw="mx-40 my-8 border border-gray-200" />

                <p tw="mb-2 text-center">Step <span tw="font-bold">{state.stage}</span> Of 9</p>

                {state.stage === 3 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <BsPeopleCircle size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-2xl  font-bold ">Personal Information</h1>
                        </header>

                        <div tw="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto bg-white md:shadow-lg md:rounded-xl">

                            <form tw="p-4 sm:p-8">
                                <label tw="block">First Name</label>
                                <Input type="text" placeholder="John Doe" />

                                <label tw="block">Last Name</label>
                                <Input type="text" placeholder="John Doe" />

                                <label tw="block">Age</label>
                                <Input type="number" placeholder="John Doe" />

                                <label tw="block">Gender</label>
                                <Select >
                                    <option value="" hidden>please select your gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Select>

                                <label tw="block">Upload Picture</label>
                                <button tw="w-full inline-flex justify-center items-center px-6 py-2 border border-green-500 hocus:bg-green-100 text-green-600 rounded-md mt-2">Upload &nbsp; <FiUploadCloud /></button>

                                <p tw="text-gray-500 my-4 text-center mx-auto">Name of uploaded file</p>
                                <button onClick={() => dispatch({ type: "changeStage", payload: 4 })} tw="w-full p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2">Next</button>
                            </form>
                        </div>
                    </>
                )}


                {state.stage === 4 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <BsPeopleCircle size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-2xl  font-bold ">Contact Information</h1>
                        </header>

                        <div tw="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto bg-white md:shadow-lg md:rounded-xl">

                            <form tw="p-4 sm:p-8">
                                <label tw="block">Email</label>
                                <Input type="email" placeholder="email@example.com" />

                                <label tw="block">Github</label>
                                <Input type="text" placeholder="username" />

                                <label tw="block">Twitter</label>
                                <Input type="text" placeholder="username" />

                                <label tw="block">Instagram</label>
                                <Input type="text" placeholder="username" />

                                <button onClick={() => dispatch({ type: "changeStage", payload: 5 })} tw="w-full p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2">Next</button>
                            </form>
                        </div>
                    </>
                )}


                {state.stage === 5 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <GrStackOverflow size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-xl sm:text-2xl  font-bold ">Stack/Role Information</h1>
                        </header>

                        <div tw="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto bg-white md:shadow-lg md:rounded-xl">

                            <form tw="p-4 sm:p-8">
                                <label tw="block">Stack, Dev Role</label>
                                <Input type="text" placeholder="Front End" />

                                <label tw="block">Experience Level</label>
                                <Input type="text" placeholder="5 years" />

                                <label tw="block">Salary/Pay Range</label>
                                <Input type="text" placeholder="$150000" />


                                <button onClick={() => dispatch({ type: "changeStage", payload: 6 })} tw="w-full p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2">Next</button>
                            </form>
                        </div>
                    </>
                )}

                {state.stage === 6 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <ImLocation2 size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-xl sm:text-2xl  font-bold ">Location Information</h1>
                        </header>

                        <div tw="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto bg-white md:shadow-lg md:rounded-xl">

                            <form tw="p-4 sm:p-8">
                                <label tw="block">Country</label>
                                <Input type="text" placeholder="Nigeria" />

                                <label tw="block">State</label>
                                <Input type="text" placeholder="Lagos" />

                                <label tw="block">City</label>
                                <Input type="text" placeholder="Lagos" />


                                <button onClick={() => dispatch({ type: "changeStage", payload: 7 })} tw="w-full p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2">Next</button>
                            </form>
                        </div>
                    </>
                )}

                {state.stage === 7 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <BsPeopleCircle size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-xl sm:text-2xl  font-bold ">About Me</h1>
                        </header>

                        <div tw="w-full sm:w-2/3 md:w-3/5  mx-auto bg-white md:shadow-lg md:rounded-xl">

                            <form tw="p-4 sm:p-8">
                                <label tw="block text-center mb-2">About Me</label>
                                <TextArea rows="8"></TextArea>

                                <button onClick={() => dispatch({ type: "changeStage", payload: 8 })} tw="w-2/3 lg:w-1/3 block mx-auto p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2">Next</button>
                            </form>
                        </div>
                    </>
                )}

                {state.stage === 8 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <BsPeopleCircle size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-xl sm:text-2xl  font-bold ">Cv/Resume Information</h1>
                        </header>

                        <div tw="w-full sm:w-2/3  mx-auto md:rounded-xl">

                            <form tw="bg-green-100 h-48 my-8 text-center p-4 sm:p-8">
                                <p tw="my-2 text-sm">This is top priority</p>
                                <label tw="block text-center my-2 font-bold">Cv/Resume</label>
                                <p tw="text-gray-500 text-sm my-4 text-center mx-auto my-2">Name of uploaded file</p>
                                <button tw="md:w-1/3 inline-flex justify-center items-center px-6 py-2 bg-white font-bold text-green-600 rounded-md my-2">Upload &nbsp; <FiUploadCloud size={20} /></button>
                            </form>

                            <button onClick={() => dispatch({ type: "changeStage", payload: 9 })} tw="block w-1/3 mx-auto p-2 bg-green-600 text-center font-bold text-white rounded-md">Next</button>
                        </div>
                    </>
                )}

            </div>
        </section>
    )

}

export default JobSeekerRegistrationPage;