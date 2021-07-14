import React from "react"; 
import {Link} from "react-dom"

const PopUP = () => {

        return (
            <section tw="text-gray-600 bg-white md:bg-gray-100 md:py-24 h-screen">
                <div tw="mx-auto py-12 md:w-2/3 my-24  bg-white md:shadow-lg md:rounded-xl">
                    <header tw="text-center mb-4 p-8">
                        <h1 tw="text-3xl text-green-600 mb-4 font-bold">Registration Completed</h1>
                        <p tw="text-base font-medium">welcome to a faster way of applying for jobs with just two clicks</p>
                    </header>
                    <Link to="/login" tw="block w-2/3 sm:w-1/3 mx-auto p-2 bg-green-600  text-center font-bold text-white rounded-md">Finish</Link>
                </div>
            </section>
        )
}

                
const Pop354 =() => {
    return (
        <section tw="text-gray-600 bg-white md:bg-gray-100 md:py-24 h-screen">
            <div tw="mx-auto py-12 md:w-2/3 my-24  bg-white md:shadow-lg md:rounded-xl">
                <header>
                    <h3 tw="text-3xl text-green-600 mb-4 font-bold">Hi Chyna!</h3>
                    <p tw="text-gray-600"> Are you sure you want to log out</p>
                </header>  
                <button tw="block w-2/3 sm:w-1/3 mx-auto p-2 bg-green-600  text-center font-bold text-white rounded-md" >Back</button>
                <button tw="text-3xl text-red-600 mb-4 font-bold" >Log out</button>
            </div>
        </section>
    );
}

const Pop360= () => {

    return (
        <section tw ="bg-white mx-auto  md:mx-auto rounded-xl h-screen">
            <div tw="mx-auto bg-white text-center">
                <header tw="text-center mb-4 p-8">
                    <h2 tw="text-gray-600 font-bold mb-4">CV/Resume</h2>
                </header>
                <main tw="text-center mb-4" > 
                    <p tw="text-gray-600 font-bold">Upload From Local Storage</p>
                    <p tw="text-gray-300 font-bold">*Name of Company*</p>
                    <button tw="text-center bg-green-600 text-white rounded-md font-bold">Continue</button>
                    <button tw="text-center bg-white text-red-600 rounded-md font-bold">Cancel</button>
                </main>
            </div>
        </section>
    )
}





export {PopUP, Pop354, Pop360};














