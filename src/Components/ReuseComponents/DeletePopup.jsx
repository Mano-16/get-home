import React from "react";
import Button from "./Button";
import './DeletePopup.css'
import { useDispatch } from "react-redux";
import { homeSliceActions } from "../../store/homeDataRedux";
import { RemoveData } from "../../lib/api";

const DeletePopup = (props) => {
    const dispatch=useDispatch()
    const {keyValue}=props
    const onDeleteHandler=()=>{
        if(keyValue){
          RemoveData(
            `https://rental-ui-89316-default-rtdb.firebaseio.com/HomeDetails/${keyValue}.json`,
            "DELETE"
          ).then(() => dispatch(homeSliceActions.RemoveHomeData(keyValue)));
          props.onHide()
        }
        else{
          console.log("Delete key is not available")
        }
    }
  return (
    <div className="DeletePopupContainer">
      <h4>Are you sure you want to delete?</h4>
      <div className="DeletePopupButton">
        <Button bgcolor="#fff" color="#000" onFunc={()=>props.onHide()}>Cancel</Button>
        <Button onFunc={onDeleteHandler}>Delete</Button>
      </div>
    </div>
  );
};

export default DeletePopup;
