import React, { useState, useEffect } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import ProfileImage from "images/profile.svg";
import { useUserContext } from "pages/UserContext";
import { Loader } from "components";
import { setAuthHeaders, getUserProfile } from "services/auth.service";
import { acceptApplication, rejectApplication } from "services/api.service";
import { useHistory, useLocation } from "react-router-dom";

const ApplicantProfilePage = () => {

    const { state } = useUserContext();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);
    const query = new URLSearchParams(useLocation().search);
    const user_id = query.get("user_id");
    const job_id = query.get("job_id");
    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        setAuthHeaders(state);
        getUserProfile(user_id)
            .then(response => {
                setUserData(response.data);
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("An error occured, could not get details please check your network and try again")
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    toast.error("An error occured, could not get details please check your network and try again")
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error("An error occured, could not get details please check your network and try again")
                }
                setLoading(false);
            });
    }, [state, user_id]);

    const handleAcceptApplication = () => {
        setLoading(true)
        setAuthHeaders(state)
        acceptApplication(job_id, user_id)
            .then(response => {
                toast.success(response.data.request);
                setLoading(false);
                history.goBack();
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

    const handleRejectApplication = () => {
        setLoading(true)
        setAuthHeaders(state)
        rejectApplication(job_id, user_id)
            .then(response => {
                toast.success(response.data.request);
                setLoading(false);
                history.goBack();
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
            <div className="flex items-center cursor-pointer" onClick={() => history.goBack()}>
                <FiArrowLeftCircle size={24} /> &nbsp; Back
            </div>
            <div className="flex flex-col justify-center mb-12 md:flex-row md:justify-between">
                <h1 className="mb-4 text-3xl font-bold text-center md:text-left text-primary md:mb-0">Applicant Profile</h1>
                <div className="">
                    <button
                        onClick={() => handleAcceptApplication()}
                        className="inline-flex items-center justify-center px-6 py-2 mr-2 text-white border rounded-md bg-primary">
                        Accept
                    </button>
                    <button
                        onClick={() => handleRejectApplication()}
                        className="inline-flex items-center justify-center px-6 py-2 text-white border rounded-md bg-danger">
                        Reject
                    </button>
                </div>
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


            <div className="p-4 my-8 text-center bg-green-100 sm:p-8">
                <p className="block my-3 text-xl font-medium text-center">Cv/Resume</p>

                <div className="my-4">

                    <a className={`${userData?.CV ? 'text-primary border-primary' : 'text-secondary-lightest border-secondary-lightest'} border inline-flex justify-center cursor:pointer items-center px-12 py-2 text-center font-medium rounded mx-4`}
                        href={userData?.CV} download={userData?.CV}
                    >
                        Download
                    </a>
                </div>
            </div>

        </div >
    )
}

export default ApplicantProfilePage;