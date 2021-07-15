import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import tw from "twin.macro";
import { Link } from "react-router-dom";
import { FiBell } from "react-icons/fi";
import { setAuthHeaders } from 'services/auth.service';
import { getNotifications } from "services/api.service";
import { useUserContext } from 'pages/UserContext';
import { Loader } from 'components';

const RefreshButton = tw.button`px-12 py-3 mx-auto rounded-lg font-bold text-primary-lightest mt-5 bg-green-700`;

const UserNotificationPage = () => {

  const { state, dispatch } = useUserContext();
  const { notifications } = state;
  const { applied, pending, rejected } = notifications;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state.notifications.applied) {
      setLoading(true);
      setAuthHeaders(state);
      getNotifications()
        .then(response => {
          console.log(response.data);
          dispatch({ type: "SETNOTIFICATIONS", payload: response.data })
          setLoading(false);
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            toast.error("An error occured, could not get jobs")
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            toast.error("An error occured, could not get jobs")
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error("An error occured, could not get jobs")
          }
          setLoading(false);
        });

    }
  }, [state, dispatch])

  const handleRefresh = () => {
    setLoading(true);
    setAuthHeaders(state);
    getNotifications()
      .then(response => {
        dispatch({ type: "SETNOTIFICATIONS", payload: response.data })
        setLoading(false);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          toast.error("An error occured, could not get jobs")
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          toast.error("An error occured, could not get jobs")
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("An error occured, could not get jobs")
        }
        setLoading(false);
      });
  }

  if (loading) return <Loader />

  return (
    <div className="my-20">
      <header className="my-4 ">
        <div className="flex flex-row items-center justify-center w-full">
          <FiBell size={24} className="mr-4 text-green-600" />
          <h1 className="text-3xl font-bold">Notifications</h1>
        </div>
        <button onClick={() => handleRefresh()}
          className="block px-4 py-2 mx-auto my-4 text-center text-white rounded-md text-bold bg-primary hover:-translate-y-8 hover:shadow-lg">
          refresh
        </button>
      </header>

      <div className="w-full p-4 mx-auto mb-8 bg-white md:w-3/4 md:shadow-lg md:rounded-xl">
        <h3 className="my-4 text-xl font-bold ">Applied Jobs</h3>

        <ul className="">
          {!applied?.length && (
            <div tw="h-20 bg-white m-4 sm:m-12 lg:mx-20  grid place-items-center text-center">
              <div>
                <p tw="text-2xl mx-auto mb-2 font-bold text-secondary-lightest">Sorry there are no available jobs for this period</p>
                <RefreshButton onClick={() => handleRefresh()}>Refresh</RefreshButton>
              </div>
            </div>
          )}
          {applied?.map((item) =>
            <li className="items-center justify-between w-full p-6 mb-4 transition duration-500 ease-in-out transform select-none bg-primary-lightest md:flex hover:-translate-y-1 rounded-2xl hover:shadow-xl" key={item.job.pk}>
              <div className="mb-2 md:mb-0">
                <h2 className='text-lg font-bold text-primary'>{item.job.title}</h2>
                <p>Company : {item.job.company_name}</p>
              </div>

              <div className="mb-2 md:mb-0">
                <p className="">Country: {item.job.country}</p>
                <p className="">State: {item.job.state}</p>
              </div>
              <div className="mb-2 md:mb-0">
                <p className="">Expected Salary: </p>
                <p>{item.job.expected_salary || "N/A"}</p>
              </div>
              <div className="mb-2 md:mb-0">
                <p className="">Date posted: {new Date(item.job.created_date).toLocaleDateString()}</p>
              </div>

              <div className="mb-2 md:mb-0">
                <Link to={"/job/details/" + item.job.pk}
                  className="inline-flex items-center justify-center px-4 py-2 mr-1 text-center text-white rounded-md w-max text-bold bg-primary md:mt-0 md:ml-8 hover:-translate-y-8 hover:shadow-lg">
                  view details
                </Link>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className="w-full p-4 mx-auto mb-8 bg-white md:w-3/4 md:shadow-lg md:rounded-xl">
        <h3 className="my-4 text-xl font-bold ">Pending Jobs</h3>

        <ul className="">
          {!pending?.length && (
            <div tw="h-20 bg-white m-4 sm:m-12 lg:mx-20  grid place-items-center text-center">
              <div>
                <p tw="text-2xl mx-auto mb-2 font-bold text-secondary-lightest">Sorry there are no available jobs for this period</p>
                <RefreshButton onClick={() => handleRefresh()}>Refresh</RefreshButton>
              </div>
            </div>
          )}
          {pending?.map((item) =>
            <li className="items-center justify-between w-full p-6 mb-4 transition duration-500 ease-in-out transform select-none bg-primary-lightest md:flex hover:-translate-y-1 rounded-2xl hover:shadow-xl" key={item.job.pk}>
              <div className="mb-2 md:mb-0">
                <h2 className='text-lg font-bold text-primary'>{item.job.title}</h2>
                <p>Company : {item.job.company_name}</p>
              </div>

              <div className="mb-2 md:mb-0">
                <p className="">Country: {item.job.country}</p>
                <p className="">State: {item.job.state}</p>
              </div>
              <div className="mb-2 md:mb-0">
                <p className="">Expected Salary: </p>
                <p>{item.job.expected_salary || "N/A"}</p>
              </div>
              <div className="mb-2 md:mb-0">
                <p className="">Date posted: {new Date(item.job.created_date).toLocaleDateString()}</p>
              </div>

              <div className="mb-2 md:mb-0">
                <Link to={"/employer/jobdetails/" + item.job.pk}
                  className="inline-flex items-center justify-center px-4 py-2 mr-1 text-center text-white rounded-md w-max text-bold bg-primary md:mt-0 md:ml-8 hover:-translate-y-8 hover:shadow-lg">
                  view details
                </Link>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div className="w-full p-4 mx-auto mb-8 bg-white md:w-3/4 md:shadow-lg md:rounded-xl">
        <h3 className="my-4 text-xl font-bold ">Decline Jobs</h3>

        <ul className="">
          {!rejected?.length && (
            <div tw="h-20 bg-white m-4 sm:m-12 lg:mx-20  grid place-items-center text-center">
              <div>
                <p tw="text-2xl mx-auto mb-2 font-bold text-secondary-lightest">Sorry there are no available jobs for this period</p>
                <RefreshButton onClick={() => handleRefresh()}>Refresh</RefreshButton>
              </div>
            </div>
          )}
          {rejected?.map((item) =>
            <li className="items-center justify-between w-full p-6 mb-4 transition duration-500 ease-in-out transform select-none bg-primary-lightest md:flex hover:-translate-y-1 rounded-2xl hover:shadow-xl" key={item.job.pk}>
              <div className="mb-2 md:mb-0">
                <h2 className='text-lg font-bold text-primary'>{item.job.title}</h2>
                <p>Company : {item.job.company_name}</p>
              </div>

              <div className="mb-2 md:mb-0">
                <p className="">Country: {item.job.country}</p>
                <p className="">State: {item.job.state}</p>
              </div>
              <div className="mb-2 md:mb-0">
                <p className="">Expected Salary: </p>
                <p>{item.job.expected_salary || "N/A"}</p>
              </div>
              <div className="mb-2 md:mb-0">
                <p className="">Date posted: {new Date(item.job.created_date).toLocaleDateString()}</p>
              </div>

              <div className="mb-2 md:mb-0">
                <Link to={"/employer/jobdetails/" + item.job.pk}
                  className="inline-flex items-center justify-center px-4 py-2 mr-1 text-center text-white rounded-md w-max text-bold bg-primary md:mt-0 md:ml-8 hover:-translate-y-8 hover:shadow-lg">
                  view details
                </Link>
              </div>
            </li>
          )}
        </ul>
      </div>

    </div>
  )
}

export default UserNotificationPage
