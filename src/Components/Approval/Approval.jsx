import React, { useEffect, useState } from "react";
import './Approval.css'
import { getHomeData } from "../../lib/api";
import { PendingDetail } from "./PendingDetail";
import { LiaTimesSolid } from "react-icons/lia";
import { useSelector, useDispatch } from "react-redux";
import { homeSliceActions } from "../../store/homeDataRedux";
const Approval = (props) => {
  const dispatch=useDispatch()
  const PendingDetails = useSelector(state=>state.homeMain.ApprovalPendingRedux)
  return (
    <div className="PendingContainer">
      <h2>Approval Pending</h2>
      {PendingDetails && PendingDetails.map((pendingDetail)=><PendingDetail detail={pendingDetail} key={pendingDetail.key} value={0}/>)}
      <span onClick={props.onHideApproval} className="close"><LiaTimesSolid/></span>
      {PendingDetails.length<=0 && <h5 className="NoMessgae">No Pending Approval</h5>}
    </div>
  );
};

export default Approval;
