import React from "react";
import tw, { styled } from "twin.macro";
import PropTypes from "prop-types";
import illustration from "images/empty_street.svg";

const Container = styled.div`
  ${tw`grid h-56 my-4 text-center bg-center bg-contain place-items-center`}
  background-image: linear-gradient(rgba(255,255,255,0.68), rgba(255,255,255,0.68)),url(${illustration});
  background-repeat: no-repeat;
`;
const Content = tw.div`flex flex-col items-center`;
const Text = tw.p`text-black text-2xl font-bold`;

const EmptyState = (props) => {
    return (
        <Container className={props.tw || props.className}>
            <Content>
                <Text>{props.message || "No Available Items"}</Text>

                <button onClick={props.onClick}
                    className="block px-8 py-2 mx-auto my-4 text-center text-white rounded-md text-bold bg-primary hover:-translate-y-8 hover:shadow-lg">
                    refresh
                </button>
            </Content>
        </Container>
    );
}

EmptyState.propTypes = {
    onClick: PropTypes.func,
    message: PropTypes.string,
    tw: PropTypes.string,
    className: PropTypes.string
}

export default EmptyState;