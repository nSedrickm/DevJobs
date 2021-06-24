import React, { useReducer } from "react";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { FiFileText, FiUploadCloud } from "react-icons/fi";
import { BsArrowRight, BsBuilding, BsPeopleCircle } from "react-icons/bs";
import { GrStackOverflow } from "react-icons/gr";
import { ImLocation2 } from "react-icons/im";

const Label = tw.label`block text-sm`;
const Input = tw.input`border border-gray-600 w-full mt-2 mb-4 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const Select = tw.select`border border-gray-600 w-full mt-2 mb-4 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const TextArea = tw.textarea`w-full rounded mt-2 mb-6 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const RadioInput = tw.input`border border-green-600 w-5 h-5 mr-4 rounded-full hocus:outline-none focus:ring-0 focus:border-green-600 text-green-600`;

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
        <section tw="text-gray-600 bg-white md:bg-gray-100 p-8">
            <div tw="mx-auto py-12 mb-12">
                <header tw="text-center">
                    <h1 tw="text-3xl text-green-600 mb-4 font-bold">Employer Profile</h1>
                    <p tw="text-base">We Need These Details To Approve Jobs Posted And Ensure The Safety Of The </p>
                    <ul tw="hidden md:inline-flex items-center text-sm md:text-base font-semibold mt-8">
                        <li onClick={() => dispatch({ type: "changeStage", payload: 3 })}
                            className={state.stage === 3 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Company Details
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 4 })}
                            className={state.stage === 4 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Company/Job Location
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 5 })}
                            className={state.stage === 5 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Job  Details
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 6 })}
                            className={state.stage === 6 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Job Requirements
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 7 })}
                            className={state.stage === 7 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Employer Personal Details
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 8 })}
                            className={state.stage === 8 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Employer Connection Details
                        </li>
                    </ul>
                </header>

                <hr tw="mx-40 my-8 border border-gray-200" />

                <p tw="mb-2 text-center">Step <span tw="font-bold">{state.stage}</span> Of 9</p>

                {state.stage === 3 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <BsBuilding size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-2xl  font-bold ">Company Details</h1>
                        </header>

                        <div tw="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto bg-white md:shadow-lg md:rounded-xl">

                            <form tw="p-4 sm:p-8">
                                <Label>Company Name</Label>
                                <Input type="text" placeholder="John Doe" />

                                <Label>Company Email</Label>
                                <Input type="email" placeholder="email@company.com" />

                                <Label>Company Identification Number</Label>
                                <Input type="text" placeholder="CMN-12303NGN" />

                                <Label>Website Link</Label>
                                <Input type="text" placeholder="https://company.com" />

                                <Label>LinkedIn</Label>
                                <Input type="text" placeholder="https://linkedin.com/company" />

                                <button onClick={() => dispatch({ type: "changeStage", payload: 4 })} tw="w-full p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2">Next</button>
                            </form>
                        </div>
                    </>
                )}


                {state.stage === 4 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <ImLocation2 size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-2xl  font-bold ">Company/Job Location</h1>
                        </header>

                        <div tw="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto bg-white md:shadow-lg md:rounded-xl">

                            <form tw="p-4 sm:p-8">
                                <label tw="w-full p-2 px-4 text-green-600 rounded-md  inline-flex items-center border border-green-600">
                                    <RadioInput type="radio" name="role" />
                                    <span>Remote</span>
                                </label>
                                <small tw="text-green-600 mb-3 mt-1 block">if selected click next otherwise continue below</small>

                                <Label>Email</Label>
                                <Input type="email" placeholder="email@example.com" />

                                <Label>Country</Label>
                                <Select >
                                    <option value="" hidden>please select country</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Cameroon">Cameroon</option>
                                </Select>

                                <Label>State</Label>
                                <Select >
                                    <option value="" hidden>please select state</option>
                                    <option value="male">Lagos</option>
                                    <option value="female">Bamenda</option>
                                </Select>

                                <Label>City</Label>
                                <Select >
                                    <option value="" hidden>please select city</option>
                                    <option value="male">Lagos</option>
                                    <option value="pretoria">Pretoria Island</option>
                                </Select>

                                <Label>Precise Location<sup tw="text-red-500">*</sup></Label>
                                <TextArea rows="4"></TextArea>
                                <button onClick={() => dispatch({ type: "changeStage", payload: 5 })} tw="w-full p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2">Next</button>
                            </form>
                        </div>
                    </>
                )}


                {state.stage === 5 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <FiFileText size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-xl sm:text-2xl  font-bold ">Job Details</h1>
                        </header>

                        <div tw="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto bg-white md:shadow-lg md:rounded-xl">

                            <form tw="p-4 sm:p-8">
                                <Label>Job Title</Label>
                                <Input type="text" placeholder="Front End Developer" />

                                <Label>Number Of Hiers</Label>
                                <Input type="text" placeholder="5 years" />

                                <Label>Experience Level</Label>
                                <Input type="text" placeholder="$150000" />

                                <Label>Expected Salary</Label>
                                <Input type="text" placeholder="$150000" />

                                <Label>Duration</Label>
                                <Select >
                                    <option value="" hidden>please select duration</option>
                                    <option value="full-time">Full time</option>
                                    <option value="part-time">Part time</option>
                                    <option value="contract">Contract</option>
                                </Select>

                                <button onClick={() => dispatch({ type: "changeStage", payload: 6 })} tw="w-full p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2">Next</button>
                            </form>
                        </div>
                    </>
                )}

                {state.stage === 6 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <GrStackOverflow size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-xl sm:text-2xl  font-bold ">Job Requirements</h1>
                        </header>

                        <form tw="w-full sm:w-2/3 md:w-1/2 lg:w-2/5  mx-auto ">
                            <div tw="p-4 sm:p-6 mb-8 bg-white md:shadow-lg md:rounded-xl">
                                <Label>About The Job Role</Label>
                                <TextArea rows="3"></TextArea>

                                <Label>Requirement Details</Label>
                                <TextArea rows="3"></TextArea>

                                <Label>Perks</Label>
                                <TextArea rows="3"></TextArea>
                            </div>

                            <header tw="w-full flex justify-center items-center my-8">
                                <GrStackOverflow size={24} tw="mr-4 text-green-600" />
                                <h1 tw="text-xl sm:text-2xl  font-bold ">Post Expiry Date</h1>
                            </header>

                            <div tw="p-4 sm:p-8 mb-8 bg-white md:shadow-lg md:rounded-xl">
                                <p tw="text-sm mb-4">Set Expiry Date For This Job</p>

                                <Label>Date</Label>
                                <Input type="date" />

                                <Label>Time</Label>
                                <Input type="time" value="07:30" />
                            </div>

                            <button onClick={() => dispatch({ type: "changeStage", payload: 7 })} tw="block w-2/3 mx-auto p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2">Next</button>
                        </form>
                    </>
                )}

                {state.stage === 7 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <BsPeopleCircle size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-xl sm:text-2xl  font-bold ">Employer Personal Details</h1>
                        </header>

                        <form tw="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
                            <div tw="p-4 sm:p-6 mb-8 bg-white md:shadow-lg md:rounded-xl">
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
                            </div>

                            <button onClick={() => dispatch({ type: "changeStage", payload: 8 })} tw="block w-2/3 mx-auto p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2">Next</button>
                        </form>
                    </>
                )}

                {state.stage === 8 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <BsPeopleCircle size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-xl sm:text-2xl  font-bold ">Employer Connection Details</h1>
                        </header>

                        <form tw="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
                            <div tw="p-4 sm:p-6 mb-8 bg-white md:shadow-lg md:rounded-xl">
                                <label tw="block">Email</label>
                                <Input type="email" placeholder="email@example.com" />

                                <label tw="block">LinkedIn</label>
                                <Input type="text" placeholder="https://linkedin.com/employer-name" />

                                <label tw="block">Phone Number</label>
                                <Input type="text" placeholder="+234801808" />
                            </div>

                            <button onClick={() => dispatch({ type: "changeStage", payload: 9 })} tw="block w-2/3 mx-auto p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2">Next</button>
                        </form>
                    </>
                )}

            </div>
        </section>
    )

}

export default EmployerRegistrationPage;