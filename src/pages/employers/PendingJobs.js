import React, { useState, useEffect } from 'react';
import tw from "twin.macro";
import toast from "react-hot-toast";
import { FiAlertCircle, FiArrowLeftCircle, FiUser } from "react-icons/fi";
import { Link, useHistory, useParams } from "react-router-dom";
import { Loader } from "components";
import { getApplications } from 'services/api.service';
import { setAuthHeaders } from 'services/auth.service';
import { useUserContext } from 'pages/UserContext';


const Container = tw.div`w-full h-full pb-24 text-gray-800 bg-primary-lightest h-full`;
const Header = tw.div`mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between mb-10 md:relative p-8 `;
const Heading = tw.h1`text-2xl font-bold text-primary`;
const RefreshButton = tw.button`px-12 py-3 mx-auto rounded-lg font-bold text-primary-lightest mt-5 bg-green-700`;
const ButtonPending = tw.button`inline-flex rounded-md mx-2 bg-transparent items-center justify-center font-bold text-warning border border-warning text-center text-sm px-4 py-2 shadow hocus:bg-warning hocus:text-white `;
const ButtonAccepted = tw.button`inline-flex rounded-md mx-2 bg-transparent items-center justify-center font-bold text-primary border border-primary text-center text-sm px-4 py-2 shadow hocus:bg-primary hocus:text-white `;
const ButtonRejected = tw.button`inline-flex rounded-md mx-2 bg-transparent items-center justify-center font-bold text-danger border border-danger text-center text-sm px-4 py-2 shadow hocus:bg-danger hocus:text-white`;

const PendingJobs = () => {

    const { state } = useUserContext();
    const [details, setdetails] = useState({})
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const { pk, title } = useParams()
    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        setAuthHeaders(state);
        getApplications(pk)
            .then(response => {
                console.log(response.data);
                setdetails(response.data);
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
    }, [state, pk]);

    if (loading) return <Loader />

    return (
        <Container>


            <Header>
                <div tw='text-center md:text-left'>
                    <div className="flex items-center mb-4 cursor-pointer" onClick={() => history.goBack()}>
                        <FiArrowLeftCircle size={24} /> &nbsp; Back
                    </div>
                    <Heading>{title || "Job title N/A"}</Heading>
                    <p tw='mt-2 text-base inline-block mb-4 md:mb-0'><span tw="text-warning font-bold">
                        {details[0]?.user_applied.length + details[0]?.user_accepted.length + details[0]?.user_rejected.length || "N/A"}</span> | Total Application(s)
                    </p>
                </div>
                <div tw=''>
                    <ButtonPending onClick={() => setPage(0)}>Pending</ButtonPending>
                    <ButtonAccepted onClick={() => setPage(1)}>Accepted</ButtonAccepted>
                    <ButtonRejected onClick={() => setPage(2)}>Declined</ButtonRejected>
                </div>
            </Header>

            <div className="container w-full px-4 mx-auto sm:px-8">
                <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                        Developers Name
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                        Date Applied
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                        Time Applied
                                    </th>

                                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                        Status
                                    </th>
                                    <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>

                                {details?.length === 0 && (
                                    <div tw="h-96 bg-white m-4 sm:m-12 lg:mx-20 shadow-lg rounded-md grid place-items-center text-center">
                                        <div>
                                            <p tw="text-2xl mx-auto mb-2 font-bold text-secondary-lightest">Sorry there are no available jobs</p>
                                            <RefreshButton onClick={() => history.goBack()}>Refresh</RefreshButton>
                                        </div>
                                    </div>
                                )}

                                {details?.length > 0 && (
                                    <>
                                        {page === 0 && (
                                            <>
                                                {!details[0]?.user_applied.length && (
                                                    <tr>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0">
                                                                    <FiAlertCircle size={24} />
                                                                </div>
                                                                <div className="ml-3">
                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                        No Available Data
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}

                                                {details[0]?.user_applied?.map((item) =>
                                                    <tr key={item.pk}>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0">
                                                                    <FiUser size={24} />
                                                                </div>
                                                                <div className="ml-3">
                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                        {`${item.first_name} ${item.last_name}` || "N/A"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {new Date(details[0].date_applied).toLocaleDateString()}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {new Date(details[0].date_applied).toLocaleTimeString()}
                                                            </p>
                                                        </td>

                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="whitespace-no-wrap text-warning">
                                                                Pending
                                                            </p>
                                                        </td>

                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <Link to={`/employer/applicant/${item.pk}/${details[0].job}`} className="whitespace-no-wrap text-primary">
                                                                See profile
                                                            </Link>
                                                        </td>
                                                    </tr>

                                                )}
                                            </>
                                        )}


                                        {page === 1 && (
                                            <>

                                                {!details[0]?.user_accepted.length && (
                                                    <tr>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0">
                                                                    <FiAlertCircle size={24} />
                                                                </div>
                                                                <div className="ml-3">
                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                        No Available Data
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}

                                                {details[0]?.user_accepted?.map((item) =>
                                                    <tr key={item.pk}>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0">
                                                                    <FiUser size={24} />
                                                                </div>
                                                                <div className="ml-3">
                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                        {`${item.first_name} ${item.last_name}` || "N/A"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {new Date(details[0].date_applied).toLocaleDateString()}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {new Date(details[0].date_applied).toLocaleTimeString()}
                                                            </p>
                                                        </td>

                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="whitespace-no-wrap text-warning">
                                                                Pending
                                                            </p>
                                                        </td>

                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <Link to={`/employer/applicant/${item.pk}/${details[0].job}`} className="whitespace-no-wrap text-primary">
                                                                See profile
                                                            </Link>
                                                        </td>
                                                    </tr>

                                                )}
                                            </>
                                        )}

                                        {page === 2 && (
                                            <>
                                                {!details[0]?.user_rejected.length && (
                                                    <tr>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0">
                                                                    <FiAlertCircle size={24} />
                                                                </div>
                                                                <div className="ml-3">
                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                        No Available Data
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}

                                                {details[0]?.user_rejected?.map((item) =>
                                                    <tr key={item.pk}>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0">
                                                                    <FiUser size={24} />
                                                                </div>
                                                                <div className="ml-3">
                                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                                        {`${item.first_name} ${item.last_name}` || "N/A"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {new Date(details[0].date_applied).toLocaleDateString()}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {new Date(details[0].date_applied).toLocaleTimeString()}
                                                            </p>
                                                        </td>

                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <p className="whitespace-no-wrap text-warning">
                                                                Pending
                                                            </p>
                                                        </td>

                                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                            <Link to={`/employer/applicant/${item.pk}/${details[0].job}`} className="whitespace-no-wrap text-primary">
                                                                See profile
                                                            </Link>
                                                        </td>
                                                    </tr>

                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </Container>
    )
}
export default PendingJobs;