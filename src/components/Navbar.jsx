import React from "react";
import tw from "twin.macro";
import logo from "images/logo-sm.svg";
import { FiMenu, FiSearch, FiLogOut, FiChevronDown, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useUserContext } from "pages/UserContext";
import { Popover, Menu, Position } from "evergreen-ui";

const MainHeader = tw.div`bg-white sticky inset-x-0 top-0 shadow-lg`;
const Brand = tw.img`font-bold text-4xl text-primary ml-2 p-2 mr-auto`;
const Nav = tw.nav`inline-flex`;
const NavLink = tw(Link)`inline-flex px-4 py-2 hocus:text-green-700`;
const Input = tw.input`border border-primary w-96 my-2 p-1.5 px-8 rounded-md bg-opacity-90 hocus:outline-none focus:ring-primary focus:border-primary`;
const Button = tw(Link)`inline-flex px-4 py-2 mx-2 rounded-md font-bold hover:bg-green-700`;
const ButtonSignUp = tw(Button)`bg-primary text-white`;
const ButtonLogIn = tw(Button)`border border-primary text-primary  hover:bg-green-100`;
const ButtonLogOut = tw.button`inline-flex items-center justify-center px-4 py-2 mx-2 rounded-md font-bold hover:bg-green-700 bg-primary text-white`;
const SearchBar = tw.div`relative mx-auto`;
const SearchIcon = tw(FiSearch)`absolute left-2 inset-y-5`;
const DesktopNav = tw.div`hidden lg:flex items-center justify-between h-16 px-4`;
const MobileNav = tw.div`lg:hidden flex items-center justify-between h-20 shadow-lg px-4 rounded-b-2xl`;

const Navbar = () => {

    const { state, handleLogOut } = useUserContext();

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
                            <Popover
                                position={Position.BOTTOM_LEFT}
                                content={
                                    <Menu>
                                        <Menu.Divider />
                                        <Link to="/users/profile">
                                            <Menu.Item
                                                icon={FiUser}
                                            >
                                                Profile
                                            </Menu.Item>
                                        </Link>
                                        <Menu.Item
                                            icon={FiLogOut}
                                            onClick={() => handleLogOut()}
                                        >
                                            Log Out
                                        </Menu.Item>

                                    </Menu>
                                }
                            >
                                <ButtonLogOut>Menu &nbsp; <FiChevronDown size={20} tw="" /></ButtonLogOut>
                            </Popover>
                        </>
                    )}
                </Nav>
            </DesktopNav>
            <MobileNav>
                <Brand src={logo} alt="DevJobs logo" />
                <FiMenu size={28} tw="m-4" />
            </MobileNav>
        </MainHeader>
    )
}

export default Navbar;