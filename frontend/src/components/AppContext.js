import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

//* Create a context to have user Data that we can use all over the children components
export const DataContext = createContext({});

//* Define the DataProvider function
export const DataProvider = ({ children }) => {

    //* define constant related to the info stored in the local storage following the login
    const LStoken = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    //* define constant for DataUserID with a state
   const [dataUserId, setDataUserId] = useState("");
   const [dataUser, setDataUser] = useState([]);

    //* Call the back end to get info related to the user 
    useEffect(() => {
        userId ? Axios.get(`http://localhost:4200/api/user/${userId}`).then((response) => {
            setDataUserId(response.data._id);
            // console.log(response.data._id);
            setDataUser(response.data);
            // console.log(response.data);
            
        }) : console.log("idNull");
    }, [userId]);

    return (
        <DataContext.Provider
            value={{
                dataUser,
                LStoken,
                dataUserId,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;