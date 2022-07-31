import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost, getPosts } from "../../actions/post-actions";

const LikeButton = ({ post }) => {

  //* We define our constant Liked with a state to change the dipslay of the heart - UserId to get the info form th redux store
  const [liked, setLiked] = useState(false);
  const userId = useSelector((state) => state.userReducer._id);
  const dispatch = useDispatch();

  //* We define two functions to handle the like and unlike 
  const like = async () => {
    await dispatch(likePost(post._id));
    dispatch(getPosts());
    setLiked(true);
  };

  const unlike = async () => {
    await dispatch(unlikePost(post._id));
    dispatch(getPosts());
    setLiked(false);
  };

  //* We change state of the heart based on the elments in the store
  useEffect(() => {
    if (post.usersLiked.includes(userId)) setLiked(true);
    else setLiked(false);
  }, [userId, post.usersLiked, liked]);

  return (
    <div className="like-container">
      {userId && liked === false && (
        <img className="like-container-img" src="/icons/heart.svg" onClick={like} alt="like" />
      )}
      {userId && liked && (
        <img className="like-container-img" src="/icons/heart-filled.svg" onClick={unlike} alt="like" />
      )}
      <span className="like-container-span">{post.likes}</span>
    </div>
  );
};

export default LikeButton;