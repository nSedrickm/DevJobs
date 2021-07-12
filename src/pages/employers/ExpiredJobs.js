import React from 'react';
import tw from "twin.macro";
import { FiSearch } from "react-icons/fi";

import { MdRefresh, MdAdd } from "react-icons/md";
import { Link } from 'react-router-dom';



const Container = tw.div`w-full h-full pb-24 text-gray-800 bg-green-100`;
const SearchBar = tw.div`relative  `;
const SearchIcon = tw(FiSearch)`absolute left-2 inset-y-5`;
const Header = tw.div`flex mb-10 md:relative  p-8 `;
const Heading = tw.h1` text-xl font-bold`;
const Divider = tw.span`hidden md:inline-flex px-1 py-1 lg:px-2 lg:py-2 text-green-600 mb-2`;
const Input = tw.input`border border-green-600 w-full my-2 p-1.5 px-8 rounded-md bg-opacity-90 hocus:outline-none focus:ring-green-600 focus:border-green-600`;
const ButtonNewJobs = tw.button` flex  bg-green-600 items-center justify-center text-white  text-center  m-2  text-sm p-2 hover:bg-transparent hover:text-green-600 hover:border hover:border-green-600`;
const ButtonRefresh = tw.button` flex bg-transparent items-center justify-center text-green-600 border border-green-600 text-center text-sm m-2 p-2 hover:bg-green-600 hover:text-white `;
const ButtonExpired= tw.button` flex  bg-red-400 items-center justify-center text-white  text-center  m-2  text-sm p-2 hover:bg-transparent hover:text-green-600 hover:border hover:border-green-600`;
const ButtoneJobs = tw.button` flex bg-transparent items-center justify-center text-green-600 border border-green-600 text-center text-sm m-2 p-2 hover:bg-green-600 hover:text-white `;











const ExpiredJobs =() => {
  const dummyData= [
    {
      id: 1,
      title: 'Web Designer',
      location:'Lagos/Nigeria',
      type:'Full time',
      pay:'$20000',
      company:'Google',
      posted:'11/05/2021',
      deadline:'01/10/2021',
      applications:'20',

    },
    {
      id: 2,
      title: 'Junior react dev',
      location:'sydney/Austrailia',
      type:'Remote',
      pay:'$70000',
      company:'Avalon',
      posted:'1/04/2021',
      deadline:'21/10/2021',
      applications:'12',

    },
    
    {
      id: 3,
      title: 'UI/UX Designer',
      location:'Capetown/South Africa',
      type:'Full time',
      pay:'$15000',
      company:'Kodak',
      posted:'1/02/2021',
      deadline:'30/05/2021',
      applications:'4',

    },
    
    {
      id: 4,
      title: 'Web intern',
      location:'Lagos/Nigeria',
      type:'Internship',
      pay:'$200',
      company:'Kuda',
      posted:'11/05/2021',
      deadline:'01/10/2021',
      applications:'7',

    },
    
    {
      id: 5,
      title: 'Senior Backend ',
      location:'Lagos/Nigeria',
      type:'Full time',
      pay:'$20000',
      company:'Google',
      posted:'11/05/2021',
      deadline:'01/10/2021',
      applications:'9',

    },
    
    
  ];



  return (
      <Container>
          <Header>
              <div tw='block'>
                  <Heading>Expired Jobs</Heading>
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
              <div tw='flex  flex-col md:flex-row md:absolute md:right-10 md:top-24 '>
                  <ButtonNewJobs> <MdAdd size={24}/> Post new jobs</ButtonNewJobs>
                  <ButtonRefresh> <MdRefresh size={24}/> Refresh</ButtonRefresh>
                  </div>
                  <div tw='flex  flex-col md:flex-row md:absolute w-full'>
                     <div tw='mx-auto flex'>
                     <ButtoneJobs to='/ActiveJobs'>  Active Jobs</ButtoneJobs>
                  <ButtonExpired tw='ml-8 ' to='/ActiveJobs'>  Expired jobs</ButtonExpired>
                     </div>
                  </div>
              
                  
              </div>
              
                  
              
              

              
              
          </Header>


         
<div
								class="container mb-2 flex mx-auto w-full items-center bg-danger-light  justify-center"
							>
								<ul class="flex flex-col p-4">
                {
          dummyData.map((item) =>
          
<li class="border-gray-400  flex flex-row mt-4" key={item.id}>
<div
  class=" select-none bg-primary-light md:flex  items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 rounded-2xl border-2 p-6 hover:shadow-xl border-red-400"
>
  <div class=" flex flex-col pl-1 mr-16">
    <div class="font-medium">
      <div className='flex flex-col md:flex-row '>
     <div className=' '> <h2 className='font-bold text-lg w-max'>{item.title}</h2></div>
      <div className="flex flex-row  w-full ">
        <p className="md:ml-10">{item.location}</p>
        <p className="ml-2">{item.type}</p>
        <p className="ml-2">{item.pay}</p>
      </div>
      </div>
      
      <div className="flex flex-col md:flex-row mt-2 md:mt-0 ">
        <p>Company:{item.company}</p>
        <div className="flex flex-row w-full md:ml-10">
          <p>Date posted: {item.posted}</p>
          <p>Deadline:{item.deadline}</p>
        </div>
      </div>
    </div>
  </div>
  <div>
    <Link class=" w-max text-center flex text-white text-bold flex-col rounded-md bg-danger justify-center items-center mr-8 md:mt-0 mt-4 md:ml-8 p-2 hover:-translate-y-8 hover:shadow-lg ">
    Delete
  </Link>
  </div>
  

 
</div>

</li>


           
          )
        }
               
               




			
								</ul>
							</div>
         




























































    
          
         

          

      </Container>
      
  )
}

export default  ExpiredJobs
