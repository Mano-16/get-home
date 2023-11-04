import React from "react";
import {MdOutlineDone} from "react-icons/md"
import { RxCross2 } from "react-icons/rx";
import { RemoveData, sendData } from "../../lib/api";
import Button from "../ReuseComponents/Button";
import { homeSliceActions } from "../../store/homeDataRedux";
import { useDispatch } from "react-redux";
import { FaStar} from 'react-icons/fa6'

export const PendingDetail = (props) => {
    const dispatch = useDispatch()
    const UserID = localStorage.getItem("ID")
    const ApprovalHandler=async()=>{
      const response = await fetch(
        `https://rental-ui-89316-default-rtdb.firebaseio.com/PendingApproval/${props.detail.key}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        }
      )
      if(response.ok){
        const data = await response.json()
        sendData(`https://rental-ui-89316-default-rtdb.firebaseio.com/HomeDetails/.json`,data).then((res)=>dispatch(homeSliceActions.AddHomeData(res)))
        RemoveData(
            `https://rental-ui-89316-default-rtdb.firebaseio.com/PendingApproval/${props.detail.key}.json`,"DELETE"
           ).then(()=>dispatch(homeSliceActions.RemoveApprovalPendingData(props.detail.key)))  
      }
      else{
        console.log("Unable to fetch")
      }
    }
    const RejectedHandler=()=>{
      
        RemoveData(
            `https://rental-ui-89316-default-rtdb.firebaseio.com/PendingApproval/${props.detail.key}.json`,"DELETE"
           ).then(()=>dispatch(homeSliceActions.RemoveApprovalPendingData(props.detail.key)))
    }
    const unSubscribeHandler=()=>{
        dispatch(homeSliceActions.RemoveFavouritesData(props.detail.key))
        console.log(props.detail.key)
        RemoveData(
            `https://rental-ui-89316-default-rtdb.firebaseio.com/Favourites/${UserID}/${props.detail.key}.json`,"DELETE"
           ).then((res) => console.log("Removed"))
    }
  return (
    <div>
        {props.detail && <div className="PendingDetail">
      <div>
        <h3>{props.detail.HomeName}</h3>
        <span>{props.detail.Location}</span>
      </div>
      <div className="contact">
        <span><Button p={"6px"} bgcolor={"green"}><a href={`tel:${props.detail.contactNumber}`}>Contact Owner</a></Button></span>
        <span className="star"> <FaStar/> {props.detail.Rating}</span>
      </div>
      {!props.value && <div className="icon">
        <span onClick={ApprovalHandler}><MdOutlineDone/></span>
        <span onClick={RejectedHandler}><RxCross2/></span>
      </div>}
      {props.value===1 && <div className="icon">
        <Button onFunc={unSubscribeHandler} bgcolor={"#000"}>Unfavourite</Button>
      </div>}
    </div>}
    </div>
  );
};
