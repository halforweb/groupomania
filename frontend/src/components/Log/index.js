import React, { useState } from "react";

import '../../styles/log.css';

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = (props) => {
    //* Creation of two modal constants using the hook state
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.sigin);

    //* Creation of the function to handle the modals by getting the element clicked e and assign it a value for its state
    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    };
    
    //* We  display the right modal according to the state recorded through the active-btn
    return (
        <div className="connection-form">
            <div className="shape1"></div>
            <div className="shape2"></div>
            <div className="form-container">
                <div className="bt-login-logup">
                    <div
                        onClick={handleModals}
                        id="register" 
                        className={signUpModal ? "active-btn" : null}
                    >
                        S'inscrire

                    </div>

                    <div
                        onClick={handleModals}
                        id="login"
                        className={signInModal ? "active-btn" : null}
                    >
                        Se connecter
                    </div>
                </div>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
            </div>
        </div>
    );
}

export default Log;