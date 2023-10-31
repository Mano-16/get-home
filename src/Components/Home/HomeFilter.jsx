import {useState} from "react";
import "./HomeFilter.css";
import { Form } from "react-router-dom";
import {AiOutlineSearch} from 'react-icons/ai'
import Button from "../ReuseComponents/Button";
import { useDispatch,useSelector } from "react-redux";
import { homeSliceActions } from "../../store/homeDataRedux";
import FilterMain from "../Filter/FilterMain";

const HomeFilter = () => {
  const [buttonClickText, setIsButtonClickText]=useState("All Accommodation")
  const dispatch = useDispatch()
  const homeData = useSelector(state=>state.homeMain.homeMainRedux)
  const homeFilterButtonHandler=(e)=>{
    setIsButtonClickText(e.target.innerText)
    let FD;
    switch(e.target.innerText){
      case "All Accommodation":
        dispatch(homeSliceActions.AddFilterHomeData(homeData))
        // dispatch(homeSliceActions.setIsFilter(1))
      break;
      case "Hotel":
        FD = homeData.filter((hD)=>hD.HomeType==="Hotel")
        dispatch(homeSliceActions.AddFilterHomeData(FD))
        dispatch(homeSliceActions.setIsFilter(1))
        break;
      case "Apartment":
        FD = homeData.filter((hD)=>hD.HomeType==="Apartment")
        dispatch(homeSliceActions.AddFilterHomeData(FD))
        dispatch(homeSliceActions.setIsFilter(1))
        break;
      case "Rental Home":
        FD = homeData.filter((hD)=>hD.HomeType==="Rental Home")
        dispatch(homeSliceActions.AddFilterHomeData(FD))
        dispatch(homeSliceActions.setIsFilter(1))
        break;
      case "Resort":
        console.log("hye")
        FD = homeData.filter((hD)=>hD.HomeType==="Resort")
        dispatch(homeSliceActions.AddFilterHomeData(FD))
        dispatch(homeSliceActions.setIsFilter(1))
        break;
    }
  }
  return (
    <div className="homeFilterContainer">
      <div className="FilterButtonContainer">
        <button onClick={homeFilterButtonHandler} className={`${buttonClickText=== "All Accommodation" ? "btn active" 
        
        :"btn"}`}>All Accommodation</button>
        <button onClick={homeFilterButtonHandler} className={`${buttonClickText=== "Hotel" ? "btn active" 
        
        :"btn"}`}>Hotel</button>
        <button onClick={homeFilterButtonHandler}className={`${buttonClickText=== "Apartment" ? "btn active" 
        
        :"btn"}`}>Apartment</button>
        <button onClick={homeFilterButtonHandler} className={`${buttonClickText=== "Rental Home" ? "btn active" 
        
        :"btn"}`}>Rental Home</button>
        <button onClick={homeFilterButtonHandler} className={`${buttonClickText=== "Resort" ? "btn active" 
        
        :"btn"}`}>Resort</button>
      </div>
      <div className="homeFormContainer">
        <FilterMain buttonType={buttonClickText}/>
      </div>
    </div>
  );
};

export default HomeFilter;
