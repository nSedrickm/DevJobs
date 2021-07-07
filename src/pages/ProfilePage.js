import React, { useState, useEffect } from "react";
import { FiUploadCloud, FiEdit3 } from "react-icons/fi";
import ProfileImage from "images/profile.svg";
import { useUserContext } from "./UserContext";

const ProfilePage = () => {

    const { getBasicUserProfile, state } = useUserContext();
    const { basicUserData, fullUserData } = state;
    const [upload, setUpload] = useState("");

    useEffect(() => {
        if (!basicUserData.pk) {
            getBasicUserProfile();
        }
    }, [basicUserData, getBasicUserProfile]);

    return (
        <div className="p-8 md:p-20 text-secondary">
            <div className="flex flex-col md:flex-row md:justify-between mb-12">
                <h1 className="text-primary text-3xl font-bold ">Profile</h1>
                <button className="px-6 py-2 border border-warning text-warning inline-flex justify-center items-center hover:bg-warning-light rounded-md">
                    <FiEdit3 size={18} /> &nbsp; Edit Profile
                </button>
            </div>
            <hr className="border border-gray-300 mb-12" />

            <div className="flex flex-col md:flex-row">
                <img
                    src={fullUserData?.picture || ProfileImage}
                    alt="profile"
                    height={150}
                    width={150}
                />
                <div>
                    <p className="md:ml-8 mb-4"><span className="font-medium">User Name : </span>{fullUserData?.user || basicUserData?.username || "N/A"}</p>
                    <p className="md:ml-8 mb-4"><span className="font-medium">First Name : </span>{fullUserData?.first_name || basicUserData?.first_name || "N/A"}</p>
                    <p className="md:ml-8 mb-4"><span className="font-medium">Last Name : </span>{fullUserData?.last_name || basicUserData?.last_name || "N/A"}</p>
                    <p className="md:ml-8 mb-4"><span className="font-medium">email : </span>{fullUserData?.email || basicUserData?.email || "N/A"}</p>
                </div>
            </div>

            <hr className="border border-gray-300 my-12" />
            <div className="flex flex-col">

                <h2 className="text-2xl font-bold mb-2">About Me</h2>
                <p className="text-base">
                    {fullUserData?.about || "N/A"}
                </p>
            </div>

            <hr className="border border-gray-300 my-12" />


            <div className="flex flex-col md:flex-row md:justify-between mb-12">
                <div className="mb-4 md:mb-0">
                    <h4 className="text-xl font-semibold mb-2">Contact Information</h4>
                    <p className="mb-4"><span className="font-medium">Email : </span> {fullUserData?.email || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">Github : </span>{fullUserData?.github || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">LinkedIn : </span>{fullUserData?.linkedin_profile || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">Twitter : </span>{fullUserData?.twitter || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">Instagram : </span>{fullUserData?.instagram || "N/A"}</p>
                </div>

                <div className="mb-4 md:mb-0">
                    <h4 className="text-xl font-semibold mb-2">Stack/Role Information</h4>
                    <p className="mb-4"><span className="font-medium">Stack, Dev Role : </span>{fullUserData?.stack_dev_role || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">Experience Level : </span>{fullUserData?.experience_level || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">Salary/Pay Range : </span>{fullUserData?.salary || "N/A"}</p>
                </div>

                <div className="mb-4 md:mb-0">
                    <h4 className="text-xl font-semibold mb-2">Location Information</h4>
                    <p className="mb-4"><span className="font-medium">Country </span>{fullUserData?.country || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">State </span>{fullUserData?.state || "N/A"}</p>
                    <p className="mb-4"><span className="font-medium">City </span>{fullUserData?.city || "N/A"}</p>
                </div>
            </div>


            <form className="bg-green-100  my-8 text-center p-4 sm:p-8">
                <p className="block text-lg text-center my-3 font-medium">Cv/Resume</p>
                <p className="text-secondary-lightest text-sm my-6 text-center mx-auto">{upload || "Name of uploaded file"}</p>
                <div className="my-4">
                    <label htmlFor="cv-upload" className="cursor-pointer inline-flex justify-center items-center px-12 py-2 bg-white font-medium text-primary rounded mx-4">

                        Upload &nbsp; <FiUploadCloud size={20} />
                        <input type='file' id="cv-upload" hidden
                            onChange={(evt) => setUpload(evt.target.value)} />
                    </label>

                    <a className={`${fullUserData?.CV ? 'text-primary border-primary' : 'text-secondary-lightest border-secondary-lightest'} border inline-flex justify-center cursor:pointer items-center px-12 py-2 text-center font-medium rounded mx-4`}
                        href={fullUserData?.CV} download={fullUserData?.CV}
                    >
                        Download
                    </a>
                </div>
            </form>

        </div>
    )
}

export default ProfilePage;