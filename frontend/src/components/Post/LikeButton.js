import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost, unlikePost } from "../../actions/post-actions";

const LikeButton = ({ post}) => {
 
  const [liked, setLiked] = useState(false);
  
  const userId = useSelector((state) => state.userReducer._id);
  
  const dispatch = useDispatch();


  const like = () => {
    dispatch(likePost(post._id));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id));
    setLiked(false);
  };

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