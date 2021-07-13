import React from 'react';
import tw from "twin.macro";
import ProfileImage from "images/profile.svg";
import { FiSearch, FiArrowLeft, FiArrowRight } from "react-icons/fi";


const SearchBar = tw.div`relative  `;
const SearchIcon = tw(FiSearch)`absolute left-2 inset-y-5`;
const Header = tw.div`flex mb-10 md:relative  p-8 `;
const Heading = tw.h1` text-xl font-bold`;
const Divider = tw.span`hidden md:inline-flex px-1 py-1 lg:px-2 lg:py-2 text-green-600 mb-2`;
const Input = tw.input`border border-green-600 w-full my-2 p-1.5 px-8 rounded-md bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;

const AcceptedJobs = () =>{
    return(
        <>
        <Header>
                <div tw='block'>
                    <Heading>List of Accepted Application</Heading>
                    <div>
                    <p>Dashboard <FiArrowRight size={18} /> Pending Application</p>
                    </div>
                   
                <div tw='flex '>
                <p tw='mt-2 text-sm'>10 New</p>
                <Divider>|</Divider>
                <p tw='mt-2 text-sm'><strong>24</strong>Total Applications</p>
                </div>
                
                <SearchBar>
                    <Input
                        type="search"
                        placeholder="Search by name or date"
                    />
                    <SearchIcon />
                </SearchBar>
                {/* <div tw='flex  flex-col md:flex-row md:absolute md:right-10 md:top-24 '>
                    <ButtonNewJobs> <MdAdd size={24}/> Post new jobs</ButtonNewJobs>
                    <ButtonRefresh> <MdRefresh size={24}/> Refresh</ButtonRefresh>
                    </div> */}
                </div>
                
                    
                
                

                
                
            </Header>
        {/* <h2 className="text-primary text-2xl font-bold">List of Pending Application</h2>
        <p tw='mt-2 text-sm'>10 New</p>
                <Divider>|</Divider>
                <p tw='mt-2 text-sm'><strong>24</strong>Total Applications</p>
        
        <SearchBar>
                    <Input
                        type="search"
                        placeholder="Search by name or date"
                    />
                    <SearchIcon />
                </SearchBar> */}
                
<div className="container mx-auto px-4 sm:px-8 max-w-3xl">
    <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                Developers Name
                            </th>
                            <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                Date Applied
                            </th>
                            <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                Time Applied
                            </th>
                            <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                Application status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#1" className="block relative">
                                            <img alt="profil" src={ProfileImage}className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Jean marc
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                12/09/2020
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    4:15am
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                    </span>
                                    <span className="relative">
                                        Pending
                                    </span>
                                    <span className="relative">
                                        See Profile
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#1" className="block relative">
                                        <img alt="profil" src={ProfileImage}className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Marcus coco
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                01/10/2012
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    5:36pm
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                    </span>
                                    <span className="relative">
                                        Declined
                                    </span>
                                    <span className="relative">
                                        See Profile
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#1" className="block relative">
                                        <img alt="profil" src={ProfileImage}className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Ecric marc
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                02/10/2018
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    11:49pm
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                    </span>
                                    <span className="relative">
                                        Pending
                                    </span>
                                    <span className="relative">
                                        See Profile
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#1" className="block relative">
                                        <img alt="profil" src={ProfileImage}className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Julien Huger
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                23/09/2010
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    07:15pm
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                    </span>
                                    <span className="relative">
                                        Declined
                                    </span>
                                    <span className="relative">
                                        See Profile
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#1" className="block relative">
                                        <img alt="profil" src={ProfileImage}className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Chinanu Queen
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                05/02/2010
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    08:20am
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                    </span>
                                    <span className="relative">
                                        Accepted
                                    </span>
                                    <span className="relative">
                                        See Profile
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#1" className="block relative">
                                        <img alt="profil" src={ProfileImage}className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Adediwura Emmanuel
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                23/04/2021
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    06:05pm
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                    </span>
                                    <span className="relative">
                                        Accepted
                                    </span>
                                    <span className="relative">
                                        See Profile
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#1" className="block relative">
                                        <img alt="profil" src={ProfileImage}className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Egorp David
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                08/07/2021
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    03:30pm
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                    </span>
                                    <span className="relative">
                                        Accepted
                                    </span>
                                    <span className="relative">
                                        See Profile
                                    </span>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <a href="#1" className="block relative">
                                        <img alt="profil" src={ProfileImage}className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                        </a>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Tolulope Christabel
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                16/12/2010
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    07:50am
                                </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                    <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                    </span>
                                    <p className="relative mx-2 inline-block">
                                        Accepted
                                    </p>
                                    <p className="relative mx-2 inline-block">
                                        See Profile
                                    </p>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                <FiArrowLeft size={18} />
                <p>1 of 5</p>
                <FiArrowRight size={18} />
                </div>
            </div>
        </div>
    </div>
</div>

                </>
    )
}
export default AcceptedJobs;