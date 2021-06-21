import React from "react";
import tw from "twin.macro";

const MainHeader = tw.div`flex items-center justify-between h-16 shadow-lg px-4`;
const Brand = tw.h1`flex-initial font-bold text-4xl text-green-500 ml-2 p-2`;
const Nav = tw.nav`inline-flex`;
const NavLink = tw.a`inline-flex px-4 py-2`;
const Search = tw.input`border border-green-500 ml-32 w-96 my-2 px-4 rounded bg-gray-100`;
const Button = tw.button`inline-flex px-4 py-2 mx-2 rounded-lg font-bold`;

const Navbar = () => {
    return (
        <MainHeader>

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
                <Button className="border border-green-600 text-green-500 hover:bg-green-500 hover:text-white">Sign Up</Button>
            </Nav>
        </MainHeader>
    )
}

export default Navbar;