import React, { useReducer } from "react";
import tw from "twin.macro";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import { BsArrowRight, BsPeopleCircle } from "react-icons/bs";
import { GrStackOverflow } from "react-icons/gr";
import { ImLocation2 } from "react-icons/im";
import { setAuthHeaders, updateUserProfile, updateCV } from 'services/auth.service';
import { Loader } from "components";
import { useUserContext } from "pages/UserContext";

const Label = tw.label`block text-sm`;
const Input = tw.input`border border-gray-600 w-full mt-2 mb-2 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const ErrorMessage = tw.p`text-sm text-red-500 mb-2`;
const SubmitButton = tw.button`block w-full md:w-2/3 mx-auto p-2 bg-green-600 text-center font-bold text-white rounded-md mt-2`;
const Select = tw.select`border border-gray-600 w-full mt-2 mb-4 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const TextArea = tw.textarea`w-full rounded-lg mb-6 hocus:outline-none focus:ring-green-600 focus:border-green-600`;

const reducer = (lstate, action) => {
    switch (action.type) {
        case 'saveData':
            return {
                ...lstate,
                data: action.payload
            };

        case 'saveUpload':
            return {
                ...lstate,
                upload: action.payload
            };
        case 'changeStage':
            return {
                ...lstate,
                stage: action.payload
            };
        case 'loading':
            return {
                ...lstate,
                loading: action.payload
            };
        default:
            throw new Error();
    }
}

const JobSeekerRegistrationPage = () => {

    const { state } = useUserContext();

    const [lstate, dispatch] = useReducer(reducer, {
        stage: 3,
        data: {},
        upload: {},
        loading: false
    });

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        dispatch({ type: "saveData", payload: data })
        if (data.first_name) {
            dispatch({ type: "changeStage", payload: 4 })
        }

        if (data.linkedIn_profile) {
            dispatch({ type: "changeStage", payload: 5 })
        }

        if (data.stack_dev_role) {
            dispatch({ type: "changeStage", payload: 6 })
        }

        if (data.country) {
            dispatch({ type: "changeStage", payload: 7 })
        }

        if (data.about) {
            handleProfileUpdate();
        }
    }

    const handleProfileUpdate = () => {
        dispatch({ type: "loading", payload: true })
        setAuthHeaders(state)
        updateUserProfile(state.id, lstate.data)
            .then(response => {
                toast.success("Profile Updated succesfully");
                dispatch({ type: "loading", payload: false });
                dispatch({ type: "changeStage", payload: 8 });
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("An error occurred Please check your network and try again");

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

    const handleCvUpload = (evt) => {

        evt.preventDefault();

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "CV",
            lstate.upload,
            lstate.upload.name
        );

        dispatch({ type: "loading", payload: true })
        setAuthHeaders(state)
        updateCV(state.id, formData)
            .then(response => {
                toast.success("CV Updated succesfully");
                dispatch({ type: "loading", payload: false });
                dispatch({ type: "changeStage", payload: 9 })
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("An error occurred Please check your network and try again");

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

    if (lstate.stage === 9) {
        return (
            <section tw="text-gray-600 bg-white md:bg-gray-100 md:py-24 h-screen">
                <div tw="mx-auto py-12 md:w-2/3 my-24  bg-white md:shadow-lg md:rounded-xl">
                    <header tw="text-center mb-4 p-8">
                        <h1 tw="text-3xl text-green-600 mb-4 font-bold">Registration Completed</h1>
                        <p tw="text-base font-medium">welcome to a faster way of applying for jobs with just two clicks</p>
                    </header>
                    <Link to="/login" tw="block w-2/3 sm:w-1/3 mx-auto p-2 bg-green-600  text-center font-bold text-white rounded-md">Home</Link>
                </div>
            </section>
        )
    }

    if (lstate.loading) return <Loader />

    return (
        <section tw="text-gray-600  bg-white md:bg-gray-100  p-8">
            <div tw="mx-auto py-12 mb-12">
                <header tw="text-center">
                    <h1 tw="text-3xl text-green-600 mb-4 font-bold">Job Seeker Profile</h1>
                    <p tw="text-base">We Need These Details To Help You Get Jobs Related To Your Profile</p>
                    <ul tw="hidden md:inline-flex items-center text-sm md:text-base font-semibold mt-8">
                        <li onClick={() => dispatch({ type: "changeStage", payload: 3 })}
                            className={lstate.stage === 3 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Personal
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 4 })}
                            className={lstate.stage === 4 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Contact
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 5 })}
                            className={lstate.stage === 5 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Stack / Role
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 6 })}
                            className={lstate.stage === 6 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Location
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 7 })}
                            className={lstate.stage === 7 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            About Me
                        </li>
                        <li><BsArrowRight size={24} /></li>
                        <li onClick={() => dispatch({ type: "changeStage", payload: 8 })}
                            className={lstate.stage === 8 && "text-green-600"}
                            tw="cursor-pointer px-4 py-1 mx-2"
                        >
                            Cv / Resume
                        </li>
                    </ul>
                </header>

                <hr tw="mx-40 my-8 border border-gray-200" />

                <p tw="mb-2 text-center">Step <span tw="font-bold">{lstate.stage}</span> Of 9</p>

                {lstate.stage === 3 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <BsPeopleCircle size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-2xl  font-bold ">Personal Information</h1>
                        </header>

                        <form
                            key="personal-details"
                            tw="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div tw="p-4 sm:p-6 mb-8 bg-white md:shadow-lg md:rounded-xl">
                                <Label>First Name</Label>
                                <Input
                                    type="text"
                                    placeholder="John"
                                    {...register("first_name", { required: true })}
                                />
                                {errors.first_name && <ErrorMessage>First name is required</ErrorMessage>}

                                <Label>Last Name</Label>
                                <Input
                                    type="text"
                                    placeholder="Doe"
                                    {...register("last_name", { required: true })}
                                />
                                {errors.last_name && <ErrorMessage>Last name is required</ErrorMessage>}

                                <Label>Age</Label>
                                <Input
                                    type="number"
                                    placeholder="24"
                                    {...register("age", { required: true, min: 0, max: 99 })}
                                />
                                {errors.age && <ErrorMessage>Please enter a valid age</ErrorMessage>}

                                <Label>Gender</Label>
                                <Select {...register("gender", { required: true })}>
                                    <option value="" hidden>please select your gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </Select>
                                {errors.gender && <ErrorMessage>Gender is required</ErrorMessage>}

                            </div>
                            <SubmitButton type="submit">Next</SubmitButton>
                        </form>

                    </>
                )}


                {lstate.stage === 4 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <BsPeopleCircle size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-2xl  font-bold ">Contact Information</h1>
                        </header>

                        <form
                            key="contact-form"
                            tw="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div tw="p-4 sm:p-6 mb-8 bg-white md:shadow-lg md:rounded-xl">
                                <Label>Github</Label>
                                <Input
                                    type="text"
                                    placeholder="https://github.com/username"
                                    {...register("github", { required: true })}
                                />
                                {errors.github && <ErrorMessage>Please enter a link to your profile</ErrorMessage>}

                                <Label>Twitter</Label>
                                <Input
                                    type="text"
                                    placeholder="https://twitter.com/username"
                                    {...register("twitter", { required: true })}
                                />
                                {errors.twitter && <ErrorMessage>Please enter a link to your profile</ErrorMessage>}

                                <Label>Linked In</Label>
                                <Input
                                    type="text"
                                    placeholder="https://linkedIn.com/username"
                                    {...register("linkedIn_profile", { required: true })}
                                />
                                {errors.linkedIn_profile && <ErrorMessage>Please enter a link to your profile</ErrorMessage>}

                            </div>
                            <SubmitButton type="submit">Next</SubmitButton>
                        </form>
                    </>
                )}


                {lstate.stage === 5 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <GrStackOverflow size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-xl sm:text-2xl  font-bold ">Stack/Role Information</h1>
                        </header>

                        <form
                            key="personal-details"
                            tw="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div tw="p-4 sm:p-6 mb-8 bg-white md:shadow-lg md:rounded-xl">
                                <Label>Stack, Dev Role</Label>
                                <Input
                                    type="text"
                                    placeholder="Front End Developer"
                                    {...register("stack_dev_role", { required: true })}
                                />
                                {errors.stack_dev_role && <ErrorMessage>This field is required</ErrorMessage>}

                                <Label>Experience Level</Label>
                                <Input
                                    type="text"
                                    placeholder="5years"
                                    {...register("experience_level", { required: true })}
                                />
                                {errors.experience_level && <ErrorMessage>This field is required</ErrorMessage>}


                                <Label>Salary/Pay Range</Label>
                                <Input
                                    type="text"
                                    placeholder="$1500000/yr"
                                    {...register("salary", { required: true })}
                                />
                                {errors.salary && <ErrorMessage>This field is required</ErrorMessage>}
                            </div>
                            <SubmitButton type="submit">Next</SubmitButton>
                        </form>
                    </>
                )}

                {lstate.stage === 6 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <ImLocation2 size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-xl sm:text-2xl  font-bold ">Location Information</h1>
                        </header>

                        <form
                            key="personal-details"
                            tw="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div tw="p-4 sm:p-6 mb-8 bg-white md:shadow-lg md:rounded-xl">
                                <Label>Country</Label>
                                <Input
                                    type="text"
                                    placeholder="Country"
                                    {...register("country", { required: true })}
                                />
                                {errors.country && <ErrorMessage>This field is required</ErrorMessage>}

                                <Label>State</Label>
                                <Input
                                    type="text"
                                    placeholder="State"

                                    {...register("state", { required: true })}
                                />
                                {errors.state && <ErrorMessage>This field is required</ErrorMessage>}

                                <Label>City</Label>
                                <Input
                                    type="text"
                                    placeholder="City"
                                    {...register("city", { required: true })}
                                />
                                {errors.city && <ErrorMessage>This field is required</ErrorMessage>}
                            </div>
                            <SubmitButton type="submit">Next</SubmitButton>
                        </form>
                    </>
                )}

                {lstate.stage === 7 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <BsPeopleCircle size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-xl sm:text-2xl  font-bold ">About Me</h1>
                        </header>

                        <form
                            key="personal-details"
                            tw="w-full sm:w-2/3 md:w-3/5 mx-auto"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div tw="p-4 sm:p-6 mb-8 bg-white md:shadow-lg md:rounded-xl">
                                <Label tw="block text-center mb-2">About Me</Label>
                                <TextArea
                                    rows="8"
                                    {...register("about", { required: true })}
                                ></TextArea>
                                {errors.about && <ErrorMessage>This field is required</ErrorMessage>}
                            </div>

                            <SubmitButton type="submit">Next</SubmitButton>
                        </form>
                    </>
                )}

                {lstate.stage === 8 && (
                    <>
                        <header tw="w-full flex justify-center items-center my-4">
                            <BsPeopleCircle size={24} tw="mr-4 text-green-600" />
                            <h1 tw="text-xl sm:text-2xl  font-bold ">Cv/Resume Information</h1>
                        </header>

                        <div tw="w-full sm:w-2/3  mx-auto md:rounded-xl">

                            <form
                                tw="w-full mx-auto mb-12"
                                onSubmit={(evt) => handleCvUpload(evt)}
                            >
                                <div tw="p-4 sm:p-8 mb-8 bg-green-100 flex flex-col justify-center items-center">
                                    <Label tw="block text-center my-2 font-bold">Cv/Resume</Label>
                                    <p className={`${lstate.upload?.name ? 'text-primary' : 'text-secondary-light'} mx-auto my-2 text-sm text-center`}>{lstate.upload?.name || "Name of uploaded file"}</p>
                                    <label htmlFor="cv-upload" className="inline-flex items-center justify-center w-full px-12 py-2 mx-auto mt-2 font-medium bg-white rounded-md cursor-pointer md:w-1/3 text-primary">
                                        Upload &nbsp; <FiUploadCloud size={20} />
                                        <input type='file' id="cv-upload" hidden
                                            onChange={(evt) => {
                                                dispatch({ type: "saveUpload", payload: evt.target.files[0] });
                                            }} />
                                    </label>
                                </div>

                                <SubmitButton tw="w-1/3" type="submit">Next</SubmitButton>
                            </form>
                        </div>
                    </>
                )}

            </div>
        </section >
    )

}

export default JobSeekerRegistrationPage;