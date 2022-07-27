import React from "react";
import Log from '../components/Log';

//* Attach to the login const the modals defined in Log using props to assing the default state on signup modal.  
const Login = () => {
  return (
    <div className="profil-page"> 
    <div className="log-container"></div>
    <Log signin={false} signup={true}/>
    </div>
  );
}

export default Login;