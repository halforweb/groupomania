import React, { useState } from "react";
import axios from "axios";

import '../../styles/signinform.css';

const SignInForm = () => {

  //* Creation of two constant using the hook state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //* Creation of the function to handle the login and push the info in the backend
  const handleLogin = (e) => {
    //* cancel the event default (load the page) from the submit input of the form
    e.preventDefault();

    //* Define const to show the error messages in the frontend in case the backend give an error message
    const messageError = document.querySelector('.message-error');
    messageError.innerHTML = "";


    //* call API to post the infos (id and pass) from the frontend to the backend
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      data: {
        email,
        password,
      },
    })
      //* Save the Token and ID in the local storage before redirection to the home page
      .then((res) => {
        console.log(res)
        localStorage.setItem("token", "Bearer " + res.data.token);
        localStorage.setItem("id", res.data.userId);
        localStorage.setItem("role", res.data.role);
        window.location = "/home";
      })
      //* We catch the issue and display the message in the screen
      .catch((err) => {
        console.log(err.response.data.error);
        messageError.innerHTML = err.response.data.error;
      });
  }

  return (
    //* On each label, we keep the value e written by the user and we change the state of our constants by assigning them a value
    <form action="" onSubmit={handleLogin} id="sign-in-form">
      <label htmlFor="email">Email</label>
      <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      <label htmlFor="password">Mot de passe</label>
      <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      <div className="message-error"></div>
      <input className="btn-submit" type="submit" value="Se connecter" />
    </form>
  );
}

export default SignInForm;