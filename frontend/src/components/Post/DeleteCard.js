import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post-actions";

//* We create a const to handle the deleteCard 
const DeleteCard = (props) => {

  //* execute the actions with redux
  const dispatch = useDispatch();
  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div className="button-container-onclick"
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          deleteQuote();
        }
      }}
    >
      <img className="button-container-img" src="/icons/trash.svg" alt="trash" />
    </div>
  );
};

export default DeleteCard;