import React from "react";
import tw from "twin.macro";
import { Spinner } from "evergreen-ui";

const Container = tw.div`h-screen grid place-items-center`;

const Loader = () => {
    return (
        <Container>
            <div>
                <Spinner tw="mx-auto" />
                <p tw="mt-2">Loading please wait</p>
            </div>
        </Container>
    );
}

export default Loader;