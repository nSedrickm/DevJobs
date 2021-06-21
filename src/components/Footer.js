import React from "react";
import tw from "twin.macro";

const FooterContainer = tw.footer`bg-green-100  text-gray-500 p-4 md:p-12 flex flex-col items-center`;

const Footer = () => {
    return (

        <FooterContainer>
            <ul tw="inline-flex items-center text-sm md:text-lg  mx-auto">
                <li tw="cursor-pointer px-4 py-1 mx-2">Get Hired</li>
                <li>|</li>
                <li tw="cursor-pointer px-4 py-1 mx-2">Hire Professional</li>
                <li>|</li>
                <li tw="cursor-pointer px-4 py-1 mx-2">Contact Us</li>
                <li>|</li>
                <li tw="cursor-pointer px-4 py-1 mx-2">FAQs</li>
                <li>|</li>
                <li tw="cursor-pointer px-4 py-1 mx-2">Privacy Policy</li>
                <li>|</li>
                <li tw="cursor-pointer px-4 py-1 mx-2">Cookie Policy</li>

            </ul>

            <ul tw="inline-flex items-center text-sm md:text-lg  mx-auto my-4">
                <li tw="cursor-pointer px-4 py-1 mx-2 text-green-600 font-bold text-2xl">DevJobs</li>
                <span> Copyright &copy; {new Date().getFullYear()}</span>
                <li tw="cursor-pointer px-4 py-1 mx-2 text-green-600 ">DevJobs.com</li>
            </ul>
        </FooterContainer>
    )
}

export default Footer;