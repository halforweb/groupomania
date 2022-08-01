import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, getPosts } from "../../actions/post-actions";

import { isEmpty } from "../Utils";


//* we import the two components related to the card element
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";

import '../../styles/card.css';


const Card = ({ post }) => {
    //* Define constants related with a state related to the update of elements
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [fileUpdate, setFileUpdate] = useState(null);

    //* Define constants to get the user data from the store with the late state and we define a dispatch constant for the actions
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    //* We define an updateItem function to handle the change from the post
    const updateItem = async () => {
        //* We form the data to push in the dispatch
        if (textUpdate || fileUpdate) {
            const data = new FormData();
            data.append('postId', post._id);
            if (textUpdate) data.append('message', textUpdate);
            if (fileUpdate) data.append("file", fileUpdate);

            //* execute the actions with redux
            await dispatch(updatePost(post._id, data));
            dispatch(getPosts());
        }
        setIsUpdated(false);
    };

    //* Creation the function to handle the image display and the set up a state to the File constant
    const handlePicture = (e) => {
        setFileUpdate(e.target.files[0]);
    };
    //* We use effect to display the loading spiner in case the server is loading and we don't have user data to display
    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);

    //* We display the content of the card if there are data loaded.
    //* We display the name of the user who created the posts
    //* We diplay the update and delete button only id the user is an admin or the creator of post 
    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {!isEmpty(usersData[0]) && usersData
                                        .map((user) => {
                                            if (user._id === post.userId) return user.pseudo;
                                            else return null;
                                        })
                                        .join("")} a posté:
                                </h3>
                            </div>
                            <span></span>
                        </div>

                        {isUpdated === false && (
                            <>
                                <p className="p-textarea">{post.message}</p>
                                <img className="card-pic" src={post.imageUrl} alt="card-pic" />
                            </>)}

                        {isUpdated && (
                            <div className="update-post">
                                <textarea className='update-post-text'
                                    defaultValue={post.message}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                />
                                <div className="icon-update">
                                    <img className="icon-update-img" src="/icons/picture.svg" alt="img" />
                                    <input className="input-update-form"
                                        type="file"
                                        id="file-upload"
                                        name="file"
                                        accept=".jpg, .jpeg,"
                                        onChange={(e) => handlePicture(e)}
                                    />
                                </div>
                                <div className="button-container">
                                    <button className="button-container-btn" onClick={updateItem} >
                                        Valider modification
                                    </button>
                                </div>
                            </div>

                        )}
                        {(userData._id === post.userId || userData.role === "admin") && (
                            <div className="button-container">
                                <div className="button-container-onclick" onClick={() => setIsUpdated(!isUpdated)}>
                                    <img className="button-container-img" src="/icons/edit.svg" alt="edit" />
                                </div>
                                <DeleteCard id={post._id} />
                            </div>
                        )}
                        <div className="card-footer">
                            <LikeButton post={post} />
                        </div>
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;