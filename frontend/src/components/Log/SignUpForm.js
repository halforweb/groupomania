import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

import '../../styles/signupform.css';

const SignUpForm = () => {

  //* Creation of 4 constant using the hook state
  const [formSubmit, setFormSubmit] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  //* Creation of the function to handle the signup and push the info in the backend
  const handleRegister = async (e) => {

    //* cancel the event default (load the page) from the submit input of the form
    e.preventDefault();

    //* Define const to show the error messages in the frontend in case the backend give an error message
    const terms = document.getElementById("terms");
    const passwordConfirmError = document.querySelector(".password-confirm.error");
    const termsError = document.querySelector(".terms.error");
    const messageError = document.querySelector(".message-error");

    //* keep the innerHTML errors blanked each time we relaunch the form
    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";
    messageError.innerHTML = "";

    //* Test the coherence of the password and the terms clicked from the frontend
    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";

      //* call API to post the infos (id and pass) from the frontend to the backend and create the account
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/signup`,
        data: {
          email,
          password,
          pseudo,
        },
      })
        .then((res) => {
          console.log(res);
          setFormSubmit(true);

        })
        //* We catch the issue and display the message in the screen
        .catch((err) => {
          console.log(err.response.data.error);
          messageError.innerHTML = err.response.data.error;

        });
    }
  };

  //* We check if the form has been submitted to redirect to login form. Else we let the user create his credentials. 
  //* On each label, we keep the value e written by the user and we change the state of our constants by assigning them a value
  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success"> Enregistrement réussi, veuillez-vous connecter</h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">

          <label htmlFor="pseudo">Pseudo</label>
          <input type="text" name="pseudo" id="pseudo" onChange={(e) => setPseudo(e.target.value)} value={pseudo} />

          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />

          <label htmlFor="password">Mot de passe</label>
          <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />

          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <input type="password" name="password" id="password-conf" onChange={(e) => setControlPassword(e.target.value)} value={controlPassword} />
          <div className="password-confirm error"></div>

          <div className="checkcontainer">
            <input className="checkbox" type="checkbox" id="terms" />
            <label className="terms" htmlFor="terms">J'accepte les{" "}
              <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a>
            </label>
          </div>
          <div className="terms error"></div>

          <div className="message-error"></div>

          <input className="btn-submit" type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};


export default SignUpForm;