import React from "react";
import tw from "twin.macro";
import logo from "images/logo-sm.svg";

const Brand = tw.img`font-bold text-4xl text-green-600 ml-2 p-2`;
const FooterContainer = tw.footer`bg-green-100  text-gray-500 p-4 md:p-12 flex flex-col items-center`;

const Footer = () => {
    return (

        <FooterContainer>
            <ul tw="md:inline-flex text-center items-center text-base md:text-lg  mx-auto">
                <li tw="cursor-pointer px-4 py-1 mx-auto">Get Hired</li>
                <li tw="hidden md:inline-flex">|</li>
                <li tw="cursor-pointer px-4 py-1 mx-auto">Hire Professional</li>
                <li tw="hidden md:inline-flex">|</li>
                <li tw="cursor-pointer px-4 py-1 mx-auto">Contact Us</li>
                <li tw="hidden md:inline-flex">|</li>
                <li tw="cursor-pointer px-4 py-1 mx-auto">FAQs</li>
                <li tw="hidden md:inline-flex">|</li>
                <li tw="cursor-pointer px-4 py-1 mx-auto">Privacy Policy</li>
                <li tw="hidden md:inline-flex">|</li>
                <li tw="cursor-pointer px-4 py-1 mx-auto">Cookie Policy</li>

            </ul>

            <ul tw="md:inline-flex items-center text-base md:text-lg  mx-auto my-4">
                <Brand src={logo} alt="DevJobs logo" />
                <span> Copyright &copy; {new Date().getFullYear()}</span>
                <li tw="cursor-pointer px-4 py-1 mx-auto text-green-600 ">DevJobs.com</li>
            </ul>
        </FooterContainer>
    )
}

export default Footer;