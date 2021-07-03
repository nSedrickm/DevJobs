import React from "react";
import {FiUser ,FiUploadCloud} from "react-icons/fi";
import { Navbar, Footer } from "components";

const ProfilePage = () =>{
    return (
        <>
        <Navbar/>
        <div className="p-20 bg-white">
            <h1 className="text-green-600 text-3xl font-bold mb-12">Profile</h1>
            <hr className="border border-gray-300 mb-12"/>

            <div className="flex flex-row">
                <FiUser 
                    size={150} 
                    className="border border-green-600"
                />
                <div>
                    <p className="ml-8 mb-4"><span className="font-medium">First Name : </span>Jane</p>
                    <p className="ml-8 mb-4"><span className="font-medium">Last Name : </span>Doe</p>
                    <p className="ml-8 mb-4"><span className="font-medium">Age : </span>26</p>
                    <p className="ml-8 mb-4"><span className="font-medium">Gender : </span>Female</p>
                </div>
            </div>

            <hr className="border border-gray-300 my-12"/>

            <h2 className="text-2xl font-bold mb-2">About Me</h2>
            <p className="text-base">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies at tempor non interdum accumsan sit est. Lectus nulla praesent mi est. A purus congue vitae purus dui vulputate quam cursus. Laoreet at adipiscing lacus tellus euismod a ultricies. Convallis hendrerit duis elementum ipsum, lectus aliquam felis quisque suscipit. Amet vulputate ultricies sed proin. Venenatis etiam id integer lacus, sit massa turpis maecenas at. Viverra nisi, etiam dignissim eget diam nisl elementum convallis. Sit.
            </p>

            <hr className="border border-gray-300 my-12"/>

            <div className="flex flex-row justify-between mb-12">
                <div>
                    <h4 className="text-xl font-bold mb-2">Contact Information</h4>
                    <p className="mb-4"><span className="font-medium">First Name : </span>Jane</p>
                    <p className="mb-4"><span className="font-medium">Last Name : </span>Doe</p>
                    <p className="mb-4"><span className="font-medium">Age : </span>26</p>
                    <p className="mb-4"><span className="font-medium">Gender : </span>Female</p>
                </div>

                <div>
                    <h4 className="text-xl font-bold mb-2">Contact Information</h4>
                    <p className="mb-4"><span className="font-medium">First Name : </span>Jane</p>
                    <p className="mb-4"><span className="font-medium">Last Name : </span>Doe</p>
                    <p className="mb-4"><span className="font-medium">Age : </span>26</p>
                    <p className="mb-4"><span className="font-medium">Gender : </span>Female</p>
                </div>

                <div>
                    <h4 className="text-xl font-bold mb-2">Contact Information</h4>
                    <p className="mb-4"><span className="font-medium">First Name : </span>Jane</p>
                    <p className="mb-4"><span className="font-medium">Last Name : </span>Doe</p>
                    <p className="mb-4"><span className="font-medium">Age : </span>26</p>
                    <p className="mb-4"><span className="font-medium">Gender : </span>Female</p>
                </div>
            </div>


            <form className="bg-green-100  my-8 text-center p-4 sm:p-8">
                 <p className="block text-lg text-center my-3 font-medium">Cv/Resume</p>
                 <p className="text-gray-500 text-sm my-6 text-center mx-auto my-2">Name of uploaded file</p>
                 <div className="my-4">
                <button className=" inline-flex justify-center items-center px-12 py-2 bg-white font-medium text-green-600 rounded mx-4">Upload &nbsp; <FiUploadCloud size={20} /></button>
                <button  className="inline-flex justify-center items-center px-12 py-2 text-center font-mdeium text-green-600 border border-green-600 rounded mx-4">Download</button>
                </div>
            </form>

        </div>
        <Footer />
        </>
    )
}

export default ProfilePage;