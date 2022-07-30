//* we import the data from the actions defined 
import {GET_USER} from "../actions/user-actions";

//* We initialise the user reducer state to null
const initialState = {};

//* we export a function userReducer with a null initial state and actions
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    //* If we ask for GET_USER, we update the state of the userReducer with the data of the payload
    case GET_USER:
      return action.payload;
    default:
      return state;
  }
}

