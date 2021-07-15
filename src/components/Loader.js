import React from "react";
import tw from "twin.macro";
import { Spinner } from "evergreen-ui";

const Container = tw.div`h-screen grid place-items-center bg-white z-50`;
const Content = tw.div`flex flex-col items-center`;
const Text = tw.p`mt-3 text-gray-500`;

const Loader = (props) => {
    return (
        <Container className={props.tw || props.className}>
            <Content>
                <Spinner />
                <Text>{props.message || "Loading please wait"}</Text>
            </Content>
        </Container>
    );
}

export default Loader;