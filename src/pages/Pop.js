import React from "react"; 

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


    
    
    export default PopUP;