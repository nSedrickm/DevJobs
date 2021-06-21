import React from "react";
import tw from "twin.macro";

import { FiMenu } from "react-icons/fi";

const MainHeader = tw.div``;
const Brand = tw.h1`font-bold text-4xl text-green-500 ml-2 p-2`;
const Nav = tw.nav`inline-flex`;
const NavLink = tw.a`inline-flex px-4 py-2`;
const Search = tw.input`border border-green-500 ml-32 w-96 my-2 px-4 rounded-md bg-gray-50`;
const Button = tw.button`inline-flex px-4 py-2 mx-2 rounded-md font-bold hover:bg-green-600`;

const DesktopNav = tw.div`hidden lg:flex items-center justify-between h-20 px-4`;
const MobileNav = tw.div`lg:hidden flex items-center justify-between h-20 shadow-lg px-4 rounded-b-2xl`;

const Navbar = () => {
    return (
        <MainHeader>
            <DesktopNav>
                <div className="inline-flex">
                    <Brand>Devjobs</Brand>
                    <Search
                        placeholder="search"
                    />
                </div>
                <Nav>
                    <NavLink href="#1" className="text-green-500">Home</NavLink>
                    <NavLink href="#1">Employer (Post Jobs)</NavLink>
                    <Button className="bg-green-500 text-white">Sign In</Button>
                    <Button className="border border-green-500 text-green-500  hover:text-white">Sign Up</Button>
                </Nav>
            </DesktopNav>
            <MobileNav>
                <Brand>Devjobs</Brand>
                <FiMenu size={28} tw="m-4" />
            </MobileNav>
        </MainHeader>
    )
}

export default Navbar;