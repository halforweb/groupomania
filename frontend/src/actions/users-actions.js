import axios from "axios";

//* Define and export the type of actions related to the users
export const GET_USERS = "GET_USERS";

//* Get the token from the LocalStorage and set up the headers for the axios calls
const LStoken = localStorage.getItem("token");
const config = {
  headers:{
    Authorization: `${LStoken}`,
  }};

//* We define and export the logic to get the data of the users
export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user`,config)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};