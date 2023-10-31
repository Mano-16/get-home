import React, { useEffect, useState } from "react";
import '../Approval/Approval.css'
import { getHomeData } from "../../lib/api";
import { PendingDetail } from "../Approval/PendingDetail";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch,useSelector } from "react-redux";
import { homeSliceActions } from "../../store/homeDataRedux";
const Favourites = (props) => {
  const dispatch = useDispatch()
  const FavouriteList = useSelector(state=>state.homeMain.favouritesRedux)
  return (
    <div className="PendingContainer">
      <h2>Favourites</h2>
      {FavouriteList && FavouriteList.map((pendingDetail)=><PendingDetail detail={pendingDetail} key={pendingDetail.key} value={1}/>)}
      <span onClick={props.onHide} className="close"><LiaTimesSolid/></span>
      {FavouriteList.length<=0 && <h5 className="NoMessgae">No Favourites Added Yet</h5>}
    </div>
  );
};

export default Favourites;
