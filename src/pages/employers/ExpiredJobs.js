import React from 'react';
import tw from "twin.macro";
import { MdRefresh, MdAdd } from "react-icons/md";

const Container = tw.div`w-full h-full pb-24 text-gray-800 bg-primary-lightest`;
const Header = tw.div`mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between mb-10 md:relative p-8 `;
const Heading = tw.h1`text-2xl font-bold text-primary`;
const ButtonNewJobs = tw.button`inline-flex mx-2 bg-primary items-center justify-center text-white border border-primary text-center text-sm p-2 hover:bg-transparent hover:text-primary hover:border hover:border-primary`;
const ButtonRefresh = tw.button`inline-flex mx-2 bg-transparent items-center justify-center text-primary border border-primary text-center text-sm p-2 hover:bg-primary hover:text-white `;

const ExpiredJobs = () => {
  const dummyData = [
    {
      id: 1,
      title: 'Web Designer',
      location: 'Lagos/Nigeria',
      type: 'Full time',
      pay: '$20000',
      company: 'Google',
      posted: '11/05/2021',
      deadline: '01/10/2021',
      applications: '20',

    },
    {
      id: 2,
      title: 'Junior react dev',
      location: 'sydney/Austrailia',
      type: 'Remote',
      pay: '$70000',
      company: 'Avalon',
      posted: '1/04/2021',
      deadline: '21/10/2021',
      applications: '12',

    },

    {
      id: 3,
      title: 'UI/UX Designer',
      location: 'Capetown/South Africa',
      type: 'Full time',
      pay: '$15000',
      company: 'Kodak',
      posted: '1/02/2021',
      deadline: '30/05/2021',
      applications: '4',

    },

    {
      id: 4,
      title: 'Web intern',
      location: 'Lagos/Nigeria',
      type: 'Internship',
      pay: '$200',
      company: 'Kuda',
      posted: '11/05/2021',
      deadline: '01/10/2021',
      applications: '7',

    },

    {
      id: 5,
      title: 'Senior Backend ',
      location: 'Lagos/Nigeria',
      type: 'Full time',
      pay: '$20000',
      company: 'Google',
      posted: '11/05/2021',
      deadline: '01/10/2021',
      applications: '9',

    },


  ];

  return (
    <Container>

      <Header>
        <div tw='text-center md:text-left'>
          <Heading>Expired Jobs</Heading>
          <p tw='mt-2 text-base inline-block mb-4 md:mb-0'>Manage all jobs and applications</p>
        </div>

        <div tw=''>
          <ButtonNewJobs> <MdAdd size={24} /> Post new jobs</ButtonNewJobs>
          <ButtonRefresh> <MdRefresh size={24} /> Refresh</ButtonRefresh>
        </div>
      </Header>


      <div className="flex items-center justify-center w-full my-2 bg-danger-light">
        <ul className="flex flex-col p-4 my-12">
          {
            dummyData.map((item) =>
              <li className="flex flex-row my-2" key={item.id}>
                <div className="items-center justify-between w-full p-6 mx-2 transition duration-500 ease-in-out transform select-none bg-primary-lightest md:flex hover:-translate-y-1 rounded-2xl hover:shadow-xl">
                  <div className="flex flex-col">
                    <div className='flex flex-col md:flex-row '>
                      <div className=''><h2 className='text-lg font-bold w-max'>{item.title}</h2></div>
                      <div className="flex flex-row w-full ">
                        <p className="md:ml-10">{item.location}</p>
                        <p className="ml-2">{item.type}</p>
                        <p className="ml-2">{item.pay}</p>
                      </div>
                    </div>

                    <div className="flex flex-col mt-2 md:flex-row md:mt-0 ">
                      <p>Company:{item.company}</p>
                      <div className="flex flex-row items-start w-full md:ml-10">
                        <p>Date posted: {item.posted}</p>
                        <p>Deadline:{item.deadline}</p>
                      </div>
                    </div>
                  </div>
                  <button className="inline-flex items-center justify-center p-2 mt-4 mr-8 text-center text-white rounded-md w-max text-bold bg-danger md:mt-0 md:ml-8 hover:-translate-y-8 hover:shadow-lg">
                    Delete
                  </button>
                </div>
              </li>
            )
          }
        </ul>
      </div>
    </Container>
  )
}

export default ExpiredJobs
