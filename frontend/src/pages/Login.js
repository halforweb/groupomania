import React from "react";
import Log from '../components/Log';

//* Attach to the login const the modals defined in Log using props to assing the default state on signup modal.  
const Login = () => {
  return (
    <React.Fragment>
    <Log signin={false} signup={true}/>
    </React.Fragment>
  );
}

export default Login;