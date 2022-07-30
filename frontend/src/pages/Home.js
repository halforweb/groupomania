import React from "react";
import Navbar from "../components/navbar";
import Thread from "../components/Thread";
import NewPostForm from "../components/Post/NewPostForm";

import '../styles/home.css';

const Home = () => {
  return (
    <React.Fragment>
      <Navbar/>
      <div className="home">
      <NewPostForm/>
      <Thread/>
      </div>
    </React.Fragment>  
  );
}

export default Home;