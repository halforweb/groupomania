import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { dateParser, isEmpty } from "../Utils";
import { isEmpty } from "../Utils";
import { updatePost, getPosts } from "../../actions/post-actions";


import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";

import '../../styles/card.css';


const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [fileUpdate, setFileUpdate] = useState(null);

    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const updateItem = async () => {

        if (textUpdate || fileUpdate) {
            const data = new FormData();
            data.append('userId', userData._id);
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

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);

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
                            <span>dateParser post createdAt</span>
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

                        {userData._id === post.userId && (
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