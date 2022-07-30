import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post-actions";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

import '../styles/thread.css';

const Thread = () => {

  //* We define the constant with a state 
  const posts = useSelector((state) => state.postReducer);

  //* We dispatch the action getPost to have posts
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getPosts());
  }, [dispatch]);


//* we map the redux store only if the state of the postreducer is not empty
//* We display the posts stored in the redux store by using the the postreducer. 
//* We use the props to collect all the info contained in the element prop and we give a unique key
  return (
      <ul className="thread-container">
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })}
      </ul>
     
  );
};

export default Thread;