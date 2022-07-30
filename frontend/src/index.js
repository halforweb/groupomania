//* Import React App, its library and style
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

//* Import the provider method from react-redux, thunk as a middleware to make async request with redux
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { legacy_createStore as createStore} from 'redux'
import { applyMiddleware} from "redux";

//* import the rootreducer and the actions to create the store
import rootReducer from "./reducers";

//* import the actions
import { getUsers } from "./actions/users-actions";
import { getUser } from "./actions/user-actions";
import { getPosts } from "./actions/post-actions";

//* Import dev tools for Redux
import { composeWithDevTools } from "redux-devtools-extension";

//* Create the store with createstore method from redux in order to have all our datas in a single place in the frontend
//* We collect all the reducer with their respective actions and we make them them avaible for the stores
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

//* We call the actions to populate the store with data
store.dispatch(getUsers());
store.dispatch(getUser());
store.dispatch(getPosts());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>

);