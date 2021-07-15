import React from "react";
import { useHistory } from "react-router";
import illustration from "images/page_not_found.svg";

const NotFoundPage = () => {

    const history = useHistory();

    return (
        <div className="grid h-screen p-12 place-items-center">
            <div>
                <p className="mb-8 font-bold text-center text-secondary">Whoops! Seems you are lost</p>
                <img src={illustration} alt="404 not found" />
                <button
                    onClick={() => history.goBack()}
                    className="block px-8 py-3 mx-auto my-8 font-bold text-center text-white bg-green-600 rounded-md"
                >
                    Return
                </button>
            </div>
        </div>
    )
}

export default NotFoundPage;