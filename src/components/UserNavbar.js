import React, { Fragment, useState, useRef } from "react";
import tw from "twin.macro";
import toast from "react-hot-toast";
import logo from "images/logo-sm.svg";
import { FiSearch, FiLoader, FiMenu, FiLogOut, FiChevronDown, FiUser, FiBell, FiInfo, FiArrowLeft, FiGrid, FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useUserContext } from "pages/UserContext";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { EmptyState } from "components";
import { searchJobs } from "services/api.service";

const MainHeader = tw.div`bg-white sticky inset-x-0 top-0 shadow-lg z-10`;
const Brand = tw.img`font-bold text-4xl text-primary ml-2 p-2 mr-auto`;
const Nav = tw.nav`inline-flex items-center`;
const NavLink = tw(Link)`h-16 inline-flex items-center px-4 py-2 mx-auto hocus:text-green-700 focus:border`;
const DesktopNav = tw.div`hidden lg:flex items-center justify-between h-16 px-4`;
const MobileNav = tw.div`lg:hidden flex items-center justify-between h-20 shadow-lg px-4 rounded-b-2xl`;
const Input = tw.input`border border-primary w-96 my-2 p-1.5 px-8 rounded-full bg-opacity-90 hocus:outline-none focus:ring-2 focus:ring-primary focus:border-none`;
const SearchBar = tw.div`relative mx-auto`;
const SearchIcon = tw(FiSearch)`absolute left-3 inset-y-5`;
const JobContainer = tw.div`p-4 sm:p-12 justify-center grid md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center place-content-center`;
const JobCard = tw.div`p-5 mx-auto w-full rounded-xl shadow-lg  bg-white text-gray-500 border hover:border-primary hover:shadow-none`;
const JobCardTitle = tw.h3`font-bold text-xl md:text-2xl mb-4 text-gray-700`;
const JobCardBody = tw.div`mb-4`;
const JobMeta = tw.div`text-sm lg:text-base py-2`;
const DetailsButton = tw(Link)`block text-center w-full p-2 sm:py-1.5 rounded font-bold text-sm border border-primary bg-primary hocus:bg-green-700 text-primary-lightest mb-3`;


const Navbar = () => {

    const { handleLogOut } = useUserContext();
    const [isOpen, setIsOpen] = useState(false);
    const [search, openSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageItems, setPageItems] = useState({});

    let cancelButtonRef = useRef(null)
    let closeButtonRef = useRef(null)

    const handleSearch = (evt) => {
        evt.preventDefault();
        setLoading(true);
        openSearch(true);
        let searchString = evt.target.elements.search.value;
        searchJobs(searchString)
            .then(response => {
                setPageItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("An error occured, could not search jobs")
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    toast.error("An error occured, could not search jobs")
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error("An error occured, could not search jobs")
                }
                openSearch(false);
                setLoading(false);
            });
    }

    return (
        <MainHeader>
            <DesktopNav>
                <Link to="/">
                    <Brand src={logo} alt="DevJobs logo" />
                </Link>

                <form onSubmit={(evt) => handleSearch(evt)}>
                    <SearchBar>
                        <Input
                            type="search"
                            name="search"
                            placeholder="Search jobs"
                        />
                        <SearchIcon />
                    </SearchBar>
                </form>

                <Nav>
                    <NavLink to="/home">
                        <FiGrid
                            size={18}
                            className="mr-2"
                            aria-hidden="true"
                        />
                        Home
                    </NavLink>

                    <NavLink to="/users/notifications" >
                        <FiBell
                            size={18}
                            className="mr-2"
                            aria-hidden="true"
                        />
                        Notifications
                    </NavLink>


                    <Menu as="div" className="relative z-50 inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-primary hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                Menu
                                <FiChevronDown
                                    className="w-5 h-5 ml-2 -mr-1"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link to="/users/profile"
                                                className={`${active ? 'text-secondary' : 'text-secondary-light'} group flex rounded-md items-center w-full p-2 mb-2 text-sm`}
                                            >
                                                <FiUser
                                                    size={18}
                                                    className="mr-2"
                                                    aria-hidden="true"
                                                />
                                                Profile
                                            </Link>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link to="/user/notifications"
                                                className={`${active ? 'text-secondary' : 'text-secondary-light'} group flex rounded-md items-center w-full p-2 mb-2 text-sm`}
                                            >
                                                <FiBell
                                                    size={18}
                                                    className="mr-2"
                                                    aria-hidden="true"
                                                />
                                                Notifications
                                            </Link>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link to="#"
                                                className={`${active ? 'text-secondary' : 'text-secondary-light'} group flex rounded-md items-center w-full p-2 mb-2 text-sm`}
                                            >
                                                <FiInfo
                                                    size={18}
                                                    className="mr-2"
                                                    aria-hidden="true"
                                                />
                                                Help And Support
                                            </Link>
                                        )}
                                    </Menu.Item>

                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => setIsOpen(true)}
                                                className={`${active ? 'text-secondary' : 'text-secondary-light'} group flex rounded-md items-center w-full p-2 mb-2 text-sm`}
                                            >
                                                <FiLogOut
                                                    size={18}
                                                    className="mr-2"
                                                    aria-hidden="true"
                                                />
                                                Logout
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>

                            </Menu.Items>
                        </Transition>
                    </Menu>
                </Nav>
            </DesktopNav>

            <MobileNav>
                <Brand src={logo} alt="DevJobs logo" />
                <FiMenu size={28} tw="m-4" />
            </MobileNav>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto text-center"
                    initialFocus={cancelButtonRef}
                    onClose={() => setIsOpen(false)}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-8 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-3xl font-bold leading-6 text-primary"
                                >
                                    Hello!
                                </Dialog.Title>
                                <div className="my-8">
                                    <p className="text-xl text-secondary-light">
                                        Are you sure you want to logout?
                                    </p>
                                </div>

                                <div className="flex flex-col justify-center mx-auto mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-1/2 p-2 mx-auto mb-4 text-sm font-medium text-white border border-transparent rounded-md bg-primary hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        ref={cancelButtonRef}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <FiArrowLeft size={18} /> &nbsp; Back
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-1/2 p-2 mx-auto mb-4 text-sm font-medium border rounded-md text-danger border-danger-light hover:bg-danger hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={() => {
                                            setIsOpen(false);
                                            handleLogOut()
                                        }}
                                    >
                                        <FiLogOut size={18} /> &nbsp; Log Out
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>

            <Dialog as="div"
                className="fixed inset-0 z-10 overflow-y-auto bg-white"
                initialFocus={closeButtonRef}
                open={search}
                onClose={() => setIsOpen(false)}
            >
                <FiXCircle
                    size={28}
                    className="fixed cursor-pointer top-4 right-6"
                    ref={closeButtonRef}
                    onClick={() => openSearch(false)}
                />

                <div className="absolute lg:p-8 inset-4 md:inset-20 ">

                    <button ref={closeButtonRef} hidden ></button>

                    {loading ? (
                        <div className="grid items-center h-full place-items-center">
                            <div className="inline-flex items-center">
                                <FiLoader size={36} className="mr-2 animate-spin text-primary" />
                                <span className="text-base tracking-wide">loading please wait</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h2 tw="text-primary text-3xl font-bold text-center tracking-wide leading-normal">Found Job(s)</h2>

                            {!pageItems?.length && <EmptyState onClick={() => openSearch(false)} message="No Active Jobs For this period" />}

                            {pageItems?.length > 0 && (
                                <JobContainer>
                                    {pageItems?.map(job => {
                                        return (
                                            <JobCard key={job.pk} >
                                                <JobCardBody>
                                                    <JobCardTitle>{job.title}</JobCardTitle>
                                                    <JobMeta>
                                                        <p tw="mb-1"><span tw="font-bold text-secondary-light">Company : </span>{job.company_name}</p>
                                                        <p tw="mb-1"><span tw="font-bold text-secondary-light">Expected Salary: </span>{job.expected_salary}</p>
                                                        <p tw="mb-1"><span tw="font-bold text-secondary-light">Experience Level: </span>{job.experience_level}</p>
                                                        <p tw="mb-1"><span tw="font-bold text-secondary-light">Posted: </span>{new Date(job.created_date).toLocaleString()}</p>
                                                    </JobMeta>
                                                </JobCardBody>
                                                <DetailsButton
                                                    onClick={() => openSearch(false)}
                                                    to={"/job/details/" + job.pk}
                                                >
                                                    See Full Details
                                                </DetailsButton>
                                            </JobCard>
                                        )
                                    })}
                                </JobContainer>
                            )}
                        </>
                    )}

                </div>
            </Dialog>
        </MainHeader>


    )
}

export default Navbar;