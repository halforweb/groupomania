//* import the library to combine reducers
import { combineReducers } from 'redux';

//* import the reducers we created that take into account the last state of our datas
import userReducer from './user-reducer';
import usersReducer from './users-reducer';
import postReducer from './post-reducer';
import errorReducer from './error-reducer';

//* we create and export the combineReducers
export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
  errorReducer,
});