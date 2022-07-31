import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { timestampParser } from "../Utils";

import { addPost, getPosts } from "../../actions/post-actions";

import '../../styles/newpostform.css';

const NewPostForm = () => {

    //* Creation of constant using the hook state
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();

    //* get the data from the store and define the dispatch function
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    //* Creation the function to handle the newpost button and push the info in the backend
    const handlePost = async () => {
        //* set up the data needed to create the post if we have picture and message 
        if (message && postPicture) {
            const data = new FormData();
            data.append('userId', userData._id);
            data.append('message', message);
            data.append("file", file);
            
            //* execute the actions with redux
            await dispatch(addPost(data));
            dispatch(getPosts());

            //* clean the post in the frontend
            cancelPost();

        } else {
            alert("Veuillez entrer un message et une image")
        }
    };

    //* Creation the function to handle the image display and the set up a state to the File constant
    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    };

    //* Creation of the function to handle the cancel post, changing the state to null of all constant
    const cancelPost = () => {
        setMessage("");
        setPostPicture("");
        setFile("");
    };

    return (
        //* for the message we change the state with the input - for the rest, we use the functions previously created
        <div className="post-container">
            <div className="post-form">
                <textarea className="post-form-textarea"
                    name="message"
                    id="message"
                    placeholder="Quoi de neuf ?"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                {message || postPicture ? (
                    <li className="card-container">
                        <div className="card-right">
                            <div className="card-header">
                                <div className="pseudo">
                                    <h3>{userData.pseudo}</h3>
                                </div>
                                <span></span>
                            </div>
                            <div className="content">
                                <p className="content-p">{message} </p>
                                <img className="content-pic-image" src={postPicture} alt="" />
                            </div>
                        </div>
                    </li>
                ) : null}

                <div className="footer-form">
                    <div className="icon">
                        <img className="icon-img" src="/icons/picture.svg" alt="img" />
                        <input className="input-footer-form"
                            type="file"
                            id="file-upload"
                            name="file"
                            accept=".jpg, .jpeg,"
                            onChange={(e) => handlePicture(e)}
                        />
                    </div>
                    <div className="btn-send">
                        {message || postPicture ? (
                            <button className="cancel" onClick={cancelPost} >Annuler message</button>
                        ) : null}
                        <button className="send" onClick={handlePost}> Envoyer</button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default NewPostForm;
