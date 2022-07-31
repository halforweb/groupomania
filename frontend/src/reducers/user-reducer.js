//* We import the actions related to the user 
import { GET_USER } from "../actions/user-actions";

//* We initialise the user reducer state to null
const initialState = {};

//* we define and export each reducer with the new state thanks to the payload we catched from the action
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    //* We update the state of the userReducer with the data of the payload
    case GET_USER:
      return action.payload;
    default:
      return state;
  }
}

