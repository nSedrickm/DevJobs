import React, { useState, useEffect } from "react";
import { FiUploadCloud, FiEdit3, FiUser, FiFileText } from "react-icons/fi";
import tw from "twin.macro";
import toast from "react-hot-toast";
import ProfileImage from "images/profile.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUserContext } from "pages/UserContext";
import { setAuthHeaders, updateUserProfile, updateCV } from 'services/auth.service';
import { Dialog } from "evergreen-ui";
import { Loader } from "components";

const Label = tw.label`block text-sm`;
const Input = tw.input`border border-gray-600 w-full mt-2 mb-4 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-primary focus:border-primary`;
const TextArea = tw.textarea`w-full rounded mt-2 mb-2 hocus:outline-none focus:ring-primary focus:border-primary`;
const ErrorMessage = tw.p`text-sm text-red-500 mb-2`;
const SubmitButton = tw.button`block w-full md:w-2/3 mx-auto p-2 bg-primary text-center font-bold text-white rounded-md mt-2`;
const Select = tw.select`border border-gray-600 w-full mt-2 mb-4 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-primary focus:border-primary`;

const ProfileSchema = yup.object().shape({
    user: yup.string().required('Please enter a username'),
    first_name: yup.string().required('Please enter your first name'),
    last_name: yup.string().required('Please enter your last name'),
    gender: yup.string().required('Please select your gender'),
    email: yup.string().email("Please enter a valid email address").required('Email is required'),
    country: yup.string().required('Country is required'),
    state: yup.string().required("State is required"),
    city: yup.string().required('City is Required'),
    about: yup.string().required('Please provide a description of yourself'),
    experience_level: yup.string().required("Please provide your experience level"),
    stack_dev_role: yup.string().required("Please enter your current role"),
    github: yup.string().required('Please provide a link to your github profile'),
    twitter: yup.string().required('Please provide a link to your twitter profile'),
    linkedIn_profile: yup.string().required('Please provide a link to your linkedin profile'),
    salary: yup.number().positive("Please enter a valid amount")
});

const UserProfilePage = () => {

    const { handleGetUserProfile, state } = useUserContext();
    const { userData } = state;
    const [upload, setUpload] = useState();
    const [isShown, setIsShown] = useState(false);
    const [isShown2, setIsShown2] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userData.pk) {
            handleGetUserProfile();
        }
    }, [userData, handleGetUserProfile]);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(ProfileSchema)
    });

    const handleProfileUpdate = (data) => {
        setLoading(true)
        setAuthHeaders(state)
        updateUserProfile(userData.pk, data)
            .then(response => {
                toast.success("Profile Updated succesfully");
                setIsShown(false);
                setLoading(false);
                handleGetUserProfile();
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
                setLoading(false);

            });
    }

    const handleCvUpload = (evt) => {

        evt.preventDefault();

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "CV",
            upload,
            upload.name
        );

        setLoading(true)
        setAuthHeaders(state)
        updateCV(userData.pk, formData)
            .then(response => {
                toast.success("CV Updated succesfully");
                setIsShown2(false);
                setLoading(false);
                handleGetUserProfile();
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
                setLoading(false);

            });
    }

    if (loading) return <Loader />;

    return (
        <div className="p-8 md:p-20 text-secondary">
            <div className="flex flex-col justify-center mb-12 md:flex-row md:justify-between">
                <h1 className="mb-4 text-3xl font-bold text-center md:text-left text-primary md:mb-0">Profile</h1>
                <button
                    onClick={() => setIsShown(true)}
                    className="inline-flex items-center justify-center px-6 py-2 border rounded-md border-warning text-warning hover:bg-warning-light">
                    <FiEdit3 size={18} /> &nbsp; Edit Profile
                </button>
            </div>
            <hr className="mb-12 border border-gray-300" />

            <div className="flex flex-col md:flex-row">
                <img
                    src={userData?.picture || ProfileImage}
                    alt="profile"
                    height={150}
                    width={150}
                />
                <div>
                    <p className="mb-4 md:ml-8"><span className="font-medium">User Name : </span>{userData?.user || "N/A"}</p>
                    <p className="mb-4 md:ml-8"><span className="font-medium">First Name : </span>{userData?.first_name || "N/A"}</p>
                    <p className="mb-4 md:ml-8"><span className="font-medium">Last Name : </span>{userData?.last_name || "N/A"}</p>
                    <p className="mb-4 md:ml-8"><span className="font-medium">email : </span>{userData?.email || "N/A"}</p>
                </div>
            </div>

            <hr className="my-12 border border-gray-300" />
            <div className="flex flex-col">

                <h2 className="mb-2 text-2xl font-bold">About Me</h2>
                <p className="text-base">
                    {userData?.about || "N/A"}
                </p>
            </div>

            <hr className="my-12 border border-gray-300" />


            <div className="flex flex-col mb-12 md:flex-row md:justify-between">
                <div className="mb-4 md:mb-0">
                    <h4 className="mb-2 text-xl font-semibold">Contact Information</h4>
                    <p className="mb-4"><span className="font-medium">Email : </span> {userData?.email || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">Github : </span>{userData?.github || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">LinkedIn : </span>{userData?.linkedIn_profile || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">Twitter : </span>{userData?.twitter || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">Instagram : </span>{userData?.instagram || "N/A"}</p>
                </div>

                <div className="mb-4 md:mb-0">
                    <h4 className="mb-2 text-xl font-semibold">Stack/Role Information</h4>
                    <p className="mb-4"><span className="font-medium">Stack, Dev Role : </span>{userData?.stack_dev_role || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">Experience Level : </span>{userData?.experience_level || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">Salary/Pay Range : </span>{userData?.salary || "N/A"}</p>
                </div>

                <div className="mb-4 md:mb-0">
                    <h4 className="mb-2 text-xl font-semibold">Location Information</h4>
                    <p className="mb-4"><span className="font-medium">Country : </span>{userData?.country || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">State : </span>{userData?.state || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">City : </span>{userData?.city || "N/A"}</p>
                </div>
            </div>


            <div className="p-4 my-8 text-center bg-green-100 sm:p-8" onSubmit={(evt) => handleCvUpload(evt)}>
                <p className="block my-3 text-xl font-medium text-center">Cv/Resume</p>

                <div className="my-4">
                    <button
                        onClick={() => setIsShown2(true)}
                        className="inline-flex items-center justify-center px-12 py-2 mx-4 mb-4 font-medium bg-white rounded cursor-pointer md:mb-0 text-primary">
                        Update
                    </button>

                    <a className={`${userData?.CV ? 'text-primary border-primary' : 'text-secondary-lightest border-secondary-lightest'} border inline-flex justify-center cursor:pointer items-center px-12 py-2 text-center font-medium rounded mx-4`}
                        href={userData?.CV} download={userData?.CV}
                    >
                        Download
                    </a>
                </div>
            </div>

            <Dialog
                isShown={isShown}
                hasFooter={false}
                onCloseComplete={() => setIsShown(false)}
            >
                <>
                    <header tw="w-full flex justify-center items-center my-4">
                        <FiUser size={36} tw="mr-4 text-primary" />
                        <h1 tw="text-2xl  font-bold ">Update Profile</h1>
                    </header>
                    <form
                        tw="w-full mx-auto mb-12"
                        onSubmit={handleSubmit(handleProfileUpdate)}
                    >
                        <div tw="p-4 sm:p-8 mb-8 bg-white">

                            <Label>User Name</Label>
                            <Input
                                type="text"
                                placeholder="John117"
                                defaultValue={userData?.user}
                                {...register("user")}
                            />
                            {errors.user && <ErrorMessage>{errors.user.message}</ErrorMessage>}

                            <Label>First Name</Label>
                            <Input
                                type="text"
                                placeholder="John"
                                defaultValue={userData?.first_name}
                                {...register("first_name")}
                            />
                            {errors.first_name && <ErrorMessage>{errors.first_name.message}</ErrorMessage>}

                            <Label>Last Name</Label>
                            <Input
                                type="text"
                                placeholder="Doe"
                                defaultValue={userData?.last_name}
                                {...register("last_name")}
                            />
                            {errors.last_name && <ErrorMessage>{errors.last_name.message}</ErrorMessage>}

                            <Label tw="block">Gender</Label>
                            <Select
                                name="gender"
                                {...register("gender")}
                            >
                                <option value="" hidden>please select your gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </Select>
                            {errors.gender && <ErrorMessage>{errors.gender.message}</ErrorMessage>}

                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="email@company.com"
                                defaultValue={userData?.email}
                                {...register("email")}
                            />
                            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                            <Label>About</Label>
                            <TextArea
                                rows="3"
                                defaultValue={userData?.about}
                                {...register("about")}>
                            </TextArea>
                            {errors.about && <ErrorMessage>{errors.about.message}</ErrorMessage>}

                            <Label>Country</Label>
                            <Input
                                type="text"
                                placeholder="Country"
                                defaultValue={userData?.country}
                                {...register("country")}
                            />
                            {errors.country && <ErrorMessage>{errors.country.message}</ErrorMessage>}

                            <Label>State</Label>
                            <Input
                                type="text"
                                placeholder="State"
                                defaultValue={userData?.state}

                                {...register("state")}
                            />
                            {errors.state && <ErrorMessage>{errors.state.message}</ErrorMessage>}

                            <Label>City</Label>
                            <Input
                                type="text"
                                placeholder="City"
                                defaultValue={userData?.city}
                                {...register("city")}
                            />
                            {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}

                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                placeholder="2 years"
                                defaultValue={userData?.experience_level}

                                {...register("experience_level")}
                            />
                            {errors.experience_level && <ErrorMessage>{errors.experience_level.message}</ErrorMessage>}

                            <Label>Salary</Label>
                            <Input
                                type="number"
                                placeholder="25000"
                                defaultValue={userData?.salary}
                                {...register("salary")}
                            />
                            {errors.salary && <ErrorMessage>{errors.salary.message}</ErrorMessage>}

                            <Label>Stack / Dev Role</Label>
                            <Input
                                type="text"
                                placeholder="Front End web developer"
                                defaultValue={userData?.stack_dev_role}
                                {...register("stack_dev_role")}
                            />
                            {errors.stack_dev_role && <ErrorMessage>{errors.stack_dev_role.message}</ErrorMessage>}


                            <Label>Github</Label>
                            <Input
                                type="text"
                                placeholder="https://github.com/username"
                                defaultValue={userData?.github}
                                {...register("github")}
                            />
                            {errors.github && <ErrorMessage>{errors.github.message}</ErrorMessage>}

                            <Label>twitter</Label>
                            <Input
                                type="text"
                                placeholder="https://twitter.com/username"
                                defaultValue={userData?.twitter}
                                {...register("twitter")}
                            />
                            {errors.twitter && <ErrorMessage>{errors.twitter.message}</ErrorMessage>}


                            <Label>LinkedIn</Label>
                            <Input
                                type="text"
                                placeholder="https://linkedin.com/username"
                                defaultValue={userData?.gender}
                                {...register("linkedIn_profile")}
                            />
                            {errors.linkedIn_profile && <ErrorMessage>{errors.linkedIn_profile.message}</ErrorMessage>}

                        </div>

                        <SubmitButton type="submit">Update</SubmitButton>
                    </form>
                </>
            </Dialog>

            <Dialog
                isShown={isShown2}
                hasFooter={false}
                onCloseComplete={() => setIsShown2(false)}
            >
                <>
                    <header tw="w-full flex justify-center items-center my-4">
                        <FiFileText size={36} tw="mr-4 text-primary" />
                        <h1 tw="text-2xl  font-bold ">Update CV</h1>
                    </header>
                    <form
                        tw="w-full mx-auto mb-12"
                        onSubmit={(evt) => handleCvUpload(evt)}
                    >
                        <div tw="p-4 sm:p-8 mb-8 bg-white">
                            <p className={`${upload?.name ? 'text-primary' : 'text-secondary-light'} mx-auto my-2 text-sm text-center`}>{upload?.name || "Name of uploaded file"}</p>
                            <label htmlFor="cv-upload" className="inline-flex items-center justify-center w-full px-12 py-2 mt-2 font-medium bg-white border rounded cursor-pointer text-primary border-primary">
                                Upload &nbsp; <FiUploadCloud size={20} />
                                <input type='file' id="cv-upload" hidden
                                    onChange={(evt) => {
                                        setUpload(evt.target.files[0]);
                                    }} />
                            </label>
                        </div>

                        <SubmitButton type="submit">Update</SubmitButton>
                    </form>
                </>
            </Dialog>

        </div>
    )
}

export default UserProfilePage;