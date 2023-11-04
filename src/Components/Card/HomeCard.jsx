import "./HomeCard.css";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";
import { MdFamilyRestroom } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { LiaTimesSolid } from "react-icons/lia";
import Button from "../ReuseComponents/Button";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { RemoveData, sendData } from "../../lib/api";
import { homeSliceActions } from "../../store/homeDataRedux";
import { Link } from "react-router-dom";
import {BiSolidLockOpen} from "react-icons/bi"
import {Tooltip} from 'react-tooltip'


const HomeCard = (props) => {
  const UserID = localStorage.getItem("ID")
  const dispatch = useDispatch();
  const adminLoggedIn = useSelector((state) => state.auth.isAdmin);
  const LoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const [isFavourite, setIsFavourite] = useState(false);
  const {
    HomeImage,
    HomeName,
    Rating,
    Location,
    Timing,
    Price,
    PricePerTime,
    contactNumber,
    key,
    Relationship
  } = props.HomeDetails;
  const cardRemoveHanlder = () => {
    props.onShow(key)
  };
  const AddFavouriteHandler = () => {
    setIsFavourite((prevState) => !prevState);
    if (!isFavourite)
      sendData(
        `https://rental-ui-89316-default-rtdb.firebaseio.com/Favourites/${UserID}/.json`,
        props.HomeDetails
      ).then((res) => dispatch(homeSliceActions.AddFavouritesData(res)));
    else{
      RemoveData(
        `https://rental-ui-89316-default-rtdb.firebaseio.com/Favourites/${UserID}/.json`,
      ).then((res) => dispatch(homeSliceActions.RemoveFavouritesData(res)));
    }
    // if(isFavourite)getData(`https://rental-ui-89316-default-rtdb.firebaseio.com/Favourites/${key}.json`,"DELETE").then((res)=>dispatch(homeSliceActions.RemoveFavouritesData(key)))
  };
  return (
    <div className="cardContainer">
   
      <div className="cardImage">
        <img src={HomeImage} alt="home1" />
        <div className="cardHoverContent">
          <Link to={`details/${key}`} data-tooltip-id="login" data-tooltip-content={!LoggedIn?"login to continue":""}>
            <button disabled={!LoggedIn} style={{cursor:!LoggedIn?"not-allowed":"pointer"}} >
              Know More
              {/* {!LoggedIn &&  <p><BiSolidLockOpen/> login to continue</p>} */}
            </button>
          </Link>
          <Tooltip id="login"/>
        </div>
        <h3>{HomeName}</h3>
        {!adminLoggedIn && (
          <h4 onClick={AddFavouriteHandler}>
            {isFavourite ? (
              <FaHeart style={{ color: "red" }} />
            ) : (
              <AiOutlineHeart />
            )}
          </h4>
        )}
        {adminLoggedIn && (
          <h4 onClick={cardRemoveHanlder}>
            <LiaTimesSolid />
          </h4>
        )}
      </div>
      <div className="cardInformation">
        <span>
          <AiOutlineStar />
          {Rating}
        </span>
        <span>
          <SlLocationPin /> {Location}
        </span>
        <span>
          <MdFamilyRestroom /> {Relationship}
        </span>
      </div>
      <div className="cardPrice">
        <div>
          <p>
            <span>${Price}</span>
            {`/${PricePerTime}`}
          </p>
          <p>including taxes and fees</p>
        </div>
        <div className="contactNumber">
        <a href={`tel:${contactNumber}`}  data-tooltip-id="loginPH" data-tooltip-content={!LoggedIn?"login to continue":""}><button disabled={!LoggedIn} p={"6px"} bgcolor={"#000"} style={{cursor:!LoggedIn?"not-allowed":"pointer"}} >
            Contact Owner
          </button></a>
          <Tooltip id="loginPH"/>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
