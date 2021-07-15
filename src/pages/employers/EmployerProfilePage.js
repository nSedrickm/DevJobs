import React, { useState, useEffect } from "react";
import { FiEdit3 } from "react-icons/fi";
import tw from "twin.macro";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUserContext } from "pages/UserContext";
import { setAuthHeaders, updateEmployerProfile } from 'services/auth.service';
import { Dialog } from "evergreen-ui";
import { Loader } from "components";
import { BsBuilding } from "react-icons/bs";

const Label = tw.label`block text-sm`;
const Input = tw.input`border border-gray-600 w-full mt-2 mb-4 p-2 px-4 placeholder-gray-400 text-sm rounded bg-opacity-90 hocus:outline-none focus:ring-primary focus:border-primary`;
const ErrorMessage = tw.p`text-sm text-red-500 mb-2`;
const SubmitButton = tw.button`block w-full md:w-2/3 mx-auto p-2 bg-primary text-center font-bold text-white rounded-md mt-2`;

const ProfileSchema = yup.object().shape({
    company_name: yup.string().required('Please enter a valid company name'),
    company_number: yup.string().required('Please enter a valid company number'),
});

const EmployerProfilePage = () => {

    const { handleGetEmployerProfile, state } = useUserContext();
    const { userData } = state;
    const [isShown, setIsShown] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userData.company_name) {
            handleGetEmployerProfile();
        }
    }, [userData, handleGetEmployerProfile]);

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
        updateEmployerProfile(state.id, data)
            .then(response => {
                toast.success("Profile Updated succesfully");
                setIsShown(false);
                setLoading(false);
                handleGetEmployerProfile();
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

            <div className="flex flex-col mb-12 md:flex-row">
                <div className="mb-4 md:mb-0">
                    <h4 className="mb-4 text-2xl font-semibold">Company Information</h4>
                    <p className="mb-4 text-lg"><span className="font-medium">Company Name : </span> {userData?.company_name || "N/A"}</p>
                    <p className="mb-4 text-lg"><span className="font-medium">Company Number : </span>{userData?.company_number || "N/A"}</p>
                </div>
            </div>

            <Dialog
                isShown={isShown}
                hasFooter={false}
                onCloseComplete={() => setIsShown(false)}
            >
                <>
                    <header tw="w-full flex justify-center items-center my-4">
                        <BsBuilding size={36} tw="mr-4 text-primary" />
                        <h1 tw="text-2xl  font-bold ">Update Profile</h1>
                    </header>
                    <form
                        tw="w-full mx-auto mb-12"
                        onSubmit={handleSubmit(handleProfileUpdate)}
                    >
                        <div tw="p-4 sm:p-8 mb-8 bg-white">

                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                placeholder="Company"
                                defaultValue={userData?.company_name}
                                {...register("company_name")}
                            />
                            {errors.company_name && <ErrorMessage>{errors.company_name.message}</ErrorMessage>}

                            <Label>Company Number</Label>
                            <Input
                                type="text"
                                placeholder="CPN-234"
                                defaultValue={userData?.company_number}
                                {...register("company_number")}
                            />
                            {errors.company_number && <ErrorMessage>{errors.company_number.message}</ErrorMessage>}
                        </div>

                        <SubmitButton type="submit">Update</SubmitButton>
                    </form>
                </>
            </Dialog>
        </div>
    )
}

export default EmployerProfilePage;