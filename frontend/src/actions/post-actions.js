import axios from "axios";

//* Define and export the type of actions related to the post
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

//* Define and export the type of actions related to the like
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

//* Define and export the type of actions related to the errors
export const GET_POST_ERRORS = "GET_POST_ERRORS";

//* Get the token from the LocalStorage and set up the headers for the axios calls
const LStoken = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `${LStoken}`,
  }
};

//* We define and export the logic to get the data of the publication
export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/publications/`, config)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data })
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (data) => {
  return (dispatch) => {
    return axios.post(`${process.env.REACT_APP_API_URL}api/publications/`, data, config)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
          console.log(res.data.errors);
        } else {
          dispatch({ type: GET_POST_ERRORS, payload: "" })
      
        }
      });
  };
};

export const updatePost = (postId, data) => {
  return (dispatch) => {
    return axios.put(`${process.env.REACT_APP_API_URL}api/publications/${postId}`, data, config)
      .then((res) => {
        console.log(res);
        dispatch({ type: UPDATE_POST, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}api/publications/${postId}`, config)
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const likePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "post",
      headers: { 'Authorization': `${LStoken}` },
      url: `${process.env.REACT_APP_API_URL}api/publications/${postId}/like`,
      data: { like: 1 },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "post",
      headers: { 'Authorization': `${LStoken}` },
      url: `${process.env.REACT_APP_API_URL}api/publications/${postId}/like`,
      data: { like: 0 },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};


