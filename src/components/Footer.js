import React from "react";
import tw from "twin.macro";
import logo from "images/logo-sm.svg";
import { FaFacebook, FaTwitterSquare } from 'react-icons/fa';
import {  AiFillLinkedin, AiOutlineSlackSquare } from 'react-icons/ai';

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

                <ul tw="flex flex-row items-center text-base md:text-lg  mx-auto my-4">
                <li  tw="text-blue-500  cursor-pointer mx-auto px-1 hover:text-black md:flex"><FaFacebook size={24}/></li>
                <li tw="text-blue-500  cursor-pointer mx-auto px-1 hover:text-black md:flex"><FaTwitterSquare size={24}/></li>
                <li tw="text-blue-500 cursor-pointer mx-auto px-1 hover:text-black md:flex"><AiFillLinkedin size={24}/></li>
                <li tw="text-blue-500 cursor-pointer mx-auto px-1 hover:text-black md:flex">< AiOutlineSlackSquare size={24}/></li>
            </ul>
                
            </ul>


            



            <ul tw="md:inline-flex items-center text-base md:text-lg  mx-auto my-4">
                <Brand src={logo} alt="DevJobs logo" />
                <span> Copyright &copy; {new Date().getFullYear()}</span>
            </ul>
        </FooterContainer>
    )
}

export default Footer;