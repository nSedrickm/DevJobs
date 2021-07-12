import React from "react";
import tw from "twin.macro";
import logo from "images/logo-sm.svg";

const Brand = tw.img`font-bold text-4xl text-primary ml-2 p-2`;
const FooterContainer = tw.footer`bg-green-100 p-2 text-gray-500 flex flex-row items-center justify-between`;

const Footer = () => {
    return (

        <FooterContainer>
            <Brand src={logo} alt="DevJobs logo" />
            <span> Copyright &copy; {new Date().getFullYear()}</span>
        </FooterContainer>
    )
}

export default Footer;