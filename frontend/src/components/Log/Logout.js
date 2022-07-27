import React from "react";
import axios from "axios";

import '../../styles/logout.css';

const Logout = () => {

    const logout = async () => {
        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
        })
            .then((resp) => {
                console.log(resp)
                localStorage.clear();
            })

            .catch((err) => console.log(err));

        window.location = "/";
    }

    return (
            <a href="/" className="logout-link" onClick={logout}>Se deconnecter</a>
    );
};

export default Logout;