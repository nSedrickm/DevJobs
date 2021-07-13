import React, { Fragment, useState, useRef } from "react";
import tw from "twin.macro";
import logo from "images/logo-sm.svg";
import { FiMenu, FiLogOut, FiChevronDown, FiUser, FiBell, FiInfo, FiArrowLeft, FiGrid } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useUserContext } from "pages/UserContext";
import { Menu, Transition, Dialog } from "@headlessui/react";

const MainHeader = tw.div`bg-white sticky inset-x-0 top-0 shadow-lg z-10`;
const Brand = tw.img`font-bold text-4xl text-primary ml-2 p-2 mr-auto`;
const Nav = tw.nav`inline-flex items-center`;
const NavLink = tw(Link)`h-16 inline-flex items-center px-4 py-2 mx-auto hocus:text-green-700 focus:border`;

const DesktopNav = tw.div`hidden lg:flex items-center justify-between h-16 px-4`;
const MobileNav = tw.div`lg:hidden flex items-center justify-between h-20 shadow-lg px-4 rounded-b-2xl`;

const Navbar = () => {

    const { handleLogOut } = useUserContext();
    let [isOpen, setIsOpen] = useState(false);
    let cancelButtonRef = useRef(null)

    return (
        <MainHeader>
            <DesktopNav>
                <Link to="/">
                    <Brand src={logo} alt="DevJobs logo" />
                </Link>
                <Nav>
                    <NavLink to="/home" tw="text-primary">
                        <FiGrid
                            size={18}
                            className="mr-2"
                            aria-hidden="true"
                        />
                        Home
                    </NavLink>

                    <NavLink to="/users/profile">
                        <FiUser
                            size={18}
                            className="mr-2"
                            aria-hidden="true"
                        />
                        Profile
                    </NavLink>

                    <NavLink to="/users/notifications" >
                        <FiBell
                            size={18}
                            className="mr-2"
                            aria-hidden="true"
                        />
                        Notifications
                    </NavLink>

                </Nav>

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
        </MainHeader>


    )
}

export default Navbar;