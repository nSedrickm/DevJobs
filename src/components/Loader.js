import React from "react";
import tw from "twin.macro";
import { Spinner } from "evergreen-ui";

const Container = tw.div`h-screen grid place-items-center`;

const Loader = () => {
    return (
        <Container>
            <div tw="flex flex-col items-center">
                <Spinner tw="" />
                <p tw="mt-3 text-gray-500">Loading please wait</p>
            </div>
        </Container>
    );
}

export default Loader;