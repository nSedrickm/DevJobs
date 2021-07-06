import React, { useEffect } from "react";
import { FiUploadCloud, FiEdit3 } from "react-icons/fi";
import ProfileImage from "images/profile.svg";
import { useUserContext } from "./UserContext";

const ProfilePage = () => {

    const { getBasicUserProfile, state } = useUserContext();
    const { userData } = state;

    useEffect(() => {
        if (!userData.pk) {
            getBasicUserProfile()
        }
    }, [userData, getBasicUserProfile]);

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
                    src={ProfileImage}
                    alt="profile"
                    height={150}
                    width={150}
                />
                <div>
                    <p className="md:ml-8 mb-4"><span className="font-medium">User Name : </span>{userData?.username || "Not provided"}</p>
                    <p className="md:ml-8 mb-4"><span className="font-medium">First Name : </span>{userData?.first_name || "Not provided"}</p>
                    <p className="md:ml-8 mb-4"><span className="font-medium">Last Name : </span>{userData?.last_name || "Not provided"}</p>
                    <p className="md:ml-8 mb-4"><span className="font-medium">email : </span>{userData?.email || "Not provided"}</p>
                </div>
            </div>

            <hr className="border border-gray-300 my-12" />
            <div className="flex flex-col">

                <h2 className="text-2xl font-bold mb-2">About Me</h2>
                <p className="text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies at tempor non interdum accumsan sit est. Lectus nulla praesent mi est. A purus congue vitae purus dui vulputate quam cursus. Laoreet at adipiscing lacus tellus euismod a ultricies. Convallis hendrerit duis elementum ipsum, lectus aliquam felis quisque suscipit. Amet vulputate ultricies sed proin. Venenatis etiam id integer lacus, sit massa turpis maecenas at. Viverra nisi, etiam dignissim eget diam nisl elementum convallis. Sit.
                </p>
            </div>

            <hr className="border border-gray-300 my-12" />


            <div className="flex flex-col md:flex-row md:justify-between mb-12">
                <div className="mb-4 md:mb-0">
                    <h4 className="text-xl font-semibold mb-2">Contact Information</h4>
                    <p className="mb-4"><span className="font-medium">Email : </span>chynasafs@gmail.com</p>
                    <p className="mb-4"><span className="font-medium">Twitter : </span>https://dffvsfdsurl</p>
                    <p className="mb-4"><span className="font-medium">Instagram : </span>https://dffvsdurl</p>
                    <p className="mb-4"><span className="font-medium">Github : </span>htpps://dffvsdurl</p>
                </div>

                <div className="mb-4 md:mb-0">
                    <h4 className="text-xl font-semibold mb-2">Stack/Role Information</h4>
                    <p className="mb-4"><span className="font-medium">Stack, Dev Role : </span>Fullstack Flutter Dev</p>
                    <p className="mb-4"><span className="font-medium">Experience Level : </span>2 Years, Intermediate</p>
                    <p className="mb-4"><span className="font-medium">Salary/Pay Range : </span>$100.00</p>
                </div>

                <div className="mb-4 md:mb-0">
                    <h4 className="text-xl font-semibold mb-2">Location Information</h4>
                    <p className="mb-4"><span className="font-medium">Country </span>Nigeria</p>
                    <p className="mb-4"><span className="font-medium">State </span>Lagos</p>
                    <p className="mb-4"><span className="font-medium">City </span>Island</p>
                </div>
            </div>


            <form className="bg-green-100  my-8 text-center p-4 sm:p-8">
                <p className="block text-lg text-center my-3 font-medium">Cv/Resume</p>
                <p className="text-secondary-lightest text-sm my-6 text-center mx-auto">Name of uploaded file</p>
                <div className="my-4">
                    <button className=" inline-flex justify-center items-center px-12 py-2 bg-white font-medium text-primary rounded mx-4">Upload &nbsp; <FiUploadCloud size={20} /></button>
                    <button className="inline-flex justify-center items-center px-12 py-2 text-center font-mdeium text-primary border border-primary rounded mx-4">Download</button>
                </div>
            </form>

        </div>
    )
}

export default ProfilePage;