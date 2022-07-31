import { GET_POST_ERRORS } from "../actions/post-actions";

//* Initialize the state value for each of our error reducer
const initialState = { postError: [] };

//*we define and export the reducer with the new state thanks to the payload we catched from the action
export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        postError: action.payload,
        userError: []
      }
    default:
      return state;
  }
}