import React from 'react';
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { Navbar, Footer } from 'components';
import { FiSearch } from "react-icons/fi";


const Container = tw.div`w-full h-full pb-24 text-gray-800 bg-green-100`;
const SearchBar = tw.div`relative ml-auto`;
const SearchIcon = tw(FiSearch)`absolute left-2 inset-y-5`;
const Header = tw.div`flex mb-10 md:relative  p-8 `;
const Heading = tw.h1` text-3xl font-bold`;
const Divider = tw.span`hidden md:inline-flex px-1 py-1 lg:px-2 lg:py-2 text-green-600 mb-2`;
const Input = tw.input`border border-green-600 w-96 my-2 p-1.5 px-8 rounded-md bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const JobContainer = tw.div`w-11/12 shadow-lg rounded bg-white mx-auto p-8`
const JobLi = tw(Link)` block w-5/12  mb-12  p-14 border  text-center   rounded-md mt-2`;





const DashboardEmployer =() => {
    return (
        <Container>
            <Navbar />
            <Header>
                <div tw='block'>
                    <Heading>Dashboard Employer</Heading>
                <div tw='flex '>
                <p tw='mt-2'>10 New</p>
                <Divider>|</Divider>
                <p tw='mt-2'><strong>24</strong>Total Applications</p>
                </div>
                
                <SearchBar>
                    <Input
                        type="search"
                        placeholder="Search jobs"
                    />
                    <SearchIcon />
                </SearchBar>
                </div>
                
                

                
                
            </Header>
            <JobContainer tw='font-bold text-2xl font-semibold'>
                <div tw='text-center text-gray-400 '>
                    <h2 >Total Jobs Posted [46]</h2>  
                </div>

                <div tw='mt-14 '>
                <div tw='flex mx-auto place-content-evenly '>
                    <JobLi to='/' tw='border-green-800 text-green-800 hover:bg-green-600 hover:text-white'>
                       <p tw='text-2xl mb-2 '> Active Job Posts</p>
                        <p>20</p>
                  
                    </JobLi>
                    <JobLi to='/' tw='border-red-800 text-red-800 hover:bg-red-600 hover:text-white'>
                    <p tw='text-2xl mb-2'> Expired Job Posts</p>
                        <p>20</p>
                  
                    </JobLi>
                    
                   

                </div>
                <div tw='flex mx-auto place-content-evenly'>
                    <JobLi to='/' tw='border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white'>
                    <p tw='text-2xl mb-2'> Pending Applications</p>
                        <p>20</p>
                  
                    </JobLi> 
                    <JobLi to='/' tw='border-green-400 text-green-600 hover:bg-green-400 hover:text-white' >
                    <p tw='text-2xl mb-2'> Accepted Applications</p>
                        <p>20</p>
                  
                    </JobLi>
                    
                   

                </div>
                </div>
               
            </JobContainer>
            

        </Container>
    )
}

export default  DashboardEmployer