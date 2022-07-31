import React from "react";
import axios from "axios";

import '../../styles/logout.css';

//* Creation of the function to handle the logout where we clean the local storage
const Logout = () => {
    const logout = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}api/user/logout`)
            .then(() => localStorage.clear())
            .catch((err) => console.log(err));

        window.location = "/";
    }
    return (
        <a href="/" className="logout-link" onClick={logout}>Se deconnecter</a>
    );
};

export default Logout;