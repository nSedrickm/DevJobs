import React, { Fragment, useState, useRef } from "react";
import tw from "twin.macro";
import logo from "images/logo-sm.svg";
import { FiMenu, FiSearch, FiLogOut, FiChevronDown, FiUser, FiBell, FiInfo, FiGrid, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useUserContext } from "pages/UserContext";
import { Menu, Transition, Dialog } from "@headlessui/react";

const MainHeader = tw.div`bg-white sticky inset-x-0 top-0 shadow-lg z-10`;
const Brand = tw.img`font-bold text-4xl text-primary ml-2 p-2 mr-auto`;
const Nav = tw.nav`inline-flex`;
const NavLink = tw(Link)`inline-flex px-4 py-2 hocus:text-green-700`;
const Input = tw.input`border border-primary w-96 my-2 p-1.5 px-8 rounded-md bg-opacity-90 hocus:outline-none focus:ring-primary focus:border-primary`;
const Button = tw(Link)`inline-flex px-4 py-2 mx-2 rounded-md font-bold hover:bg-green-700`;
const ButtonSignUp = tw(Button)`bg-primary text-white`;
const ButtonLogIn = tw(Button)`border border-primary text-primary  hover:bg-green-100`;
const SearchBar = tw.div`relative mx-auto`;
const SearchIcon = tw(FiSearch)`absolute left-2 inset-y-5`;
const DesktopNav = tw.div`hidden lg:flex items-center justify-between h-16 px-4`;
const MobileNav = tw.div`lg:hidden flex items-center justify-between h-20 shadow-lg px-4 rounded-b-2xl`;

const Navbar = () => {

    const { state, handleLogOut } = useUserContext();
    let [isOpen, setIsOpen] = useState(false);
    let cancelButtonRef = useRef(null)

    return (
        <MainHeader>
            <DesktopNav>
                <Link to="/">
                    <Brand src={logo} alt="DevJobs logo" />
                </Link>
                <SearchBar>
                    <Input
                        type="search"
                        placeholder="Search jobs"
                    />
                    <SearchIcon />
                </SearchBar>
                <Nav>
                    <NavLink to="/" tw="text-primary">Home</NavLink>
                    {/* <NavLink to="/dashboard">Employer (Post Jobs)</NavLink> */}
                    {!state.key ? (
                        <>
                            <ButtonSignUp to="/signup">Sign Up</ButtonSignUp>
                            <ButtonLogIn to="/login">Log In</ButtonLogIn>
                        </>
                    ) : (
                        <>
                            <Menu as="div" className="relative inline-block text-left z-50">
                                <div>
                                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
                                                    <Link to="/employer/dashboard"
                                                        className={`${active ? 'text-secondary' : 'text-secondary-light'} group flex rounded-md items-center w-full p-2 mb-2 text-sm`}
                                                    >
                                                        <FiGrid
                                                            size={18}
                                                            className="mr-2"
                                                            aria-hidden="true"
                                                        />
                                                        Employer/Post Jobs
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
                        </>
                    )}
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
                            <Dialog.Overlay className="fixed bg-black bg-opacity-25 inset-0" />
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

                                <div className="mt-4 flex flex-col mx-auto justify-center">
                                    <button
                                        type="button"
                                        className="inline-flex w-1/2 mx-auto justify-center text-sm font-medium text-white p-2 mb-4 bg-primary border border-transparent rounded-md hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        ref={cancelButtonRef}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <FiArrowLeft size={18} /> &nbsp; Back
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex w-1/2 mx-auto justify-center text-sm font-medium text-danger p-2 mb-4  border border-danger-light rounded-md hover:bg-danger hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
        </MainHeader>


    )
}

export default Navbar;