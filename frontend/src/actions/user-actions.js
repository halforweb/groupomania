//* import axios
import axios from "axios";

//* Define that actions that will available
export const GET_USER = "GET_USER";


const LStoken = localStorage.getItem("token");

const config = {
  headers:{
    Authorization: `${LStoken}`,
  }};

//* We define and export the logic to get the data of the user
export const getUser = () => {
    const userId = localStorage.getItem("id");
    //* We collect data from the back and then push it to the reducer that is going to record the a new state
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${userId}`,config)
      .then((res) => {
        console.log(res);
        //* Dispatch = send data to the reducer
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};


