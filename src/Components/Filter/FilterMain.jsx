import React, { useEffect, useRef, useState } from "react";
import "./FilterMain.css";
import Select from "react-select";
import { LiaTimesSolid } from "react-icons/lia";
import Button from "../ReuseComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { homeSliceActions } from "../../store/homeDataRedux";

const FilterMain = (props) => {
  const homeData1 = useSelector((state) => state.homeMain.homeMainRedux);
  const homeData = useSelector(state=>state.homeMain.filterHomeRedux)
  const [filterData, setFilterData] = useState({});
  const [filterHomeData, setFilterHomeData] = useState(homeData);
  const dispatch = useDispatch();
  // useEffect(() => {
  //     let x = homeData;
  //     if(filterData.HomeType) {
  //        x = x.filter((home) => home.HomeType === filterData.HomeType);
  //         setFilterHomeData(x);
  //     }
  //     if(filterData.Location) {
  //        x =  x.filter((home) => home.Location === filterData.Location);
  //         setFilterHomeData(x);
  //     }
  // }, [filterData])
  const RatingOptions = [
    { value: 3, label: "<3" },
    { value: 3.5, label: "3 to 3.5" },
    { value: 4, label: "3.5 to 4" },
    { value: 4.5, label: "4 to 4.5" },
    { value: 5, label: "4.5 to 5" },
  ];
  const onFliterTrigger = (e) => {
    let x = homeData;
    if (filterData.Rent) {
      x=x.filter((home)=> Number(home.Price)<=filterData.Rent)
    }
    if (filterData.Location) {
      x = x.filter((home) => home.Location.toLowerCase() === filterData.Location.toLowerCase());
      setFilterHomeData(x);
    }
    if(filterData.BHK){
      x=x.filter((home)=>home.BHK===filterData.BHK)
    }
    if(filterData.Relationship){
      if(filterData.Relationship!=="Bachelor/Family")x=x.filter((home)=>home.Relationship===filterData.Relationship)
    }
    if(filterData.Rating){
      const y = filterData.Rating-0.5
      x=x.filter((home)=>home.Rating<filterData.Rating && home.Rating>y)
    }
    dispatch(homeSliceActions.AddSubFilterHomeData(x));
    dispatch(homeSliceActions.setIsFilter(2));
  };

  const onLocationChange = (e) => {
    setFilterData({ ...filterData, [e.target.id]: e.target.value });
  };
  const onRentChangeHandler = (e) => {
    const Rent = Number(e.target.value);
    setFilterData({ ...filterData, Rent: Rent });
  };
  const ResetFilterHandler = () => {
    setFilterHomeData(homeData);
    setFilterData({Location:""})
    dispatch(homeSliceActions.AddSubFilterHomeData(homeData));
  };
  return (
    <div className="filterContainer">
      {props.buttonType==="All Accommodation" && <div className="center"><span>“Life takes you unexpected places, love brings you home.”</span></div>}
      {props.buttonType!=="All Accommodation"&&<div className="FilterForm" >
        <div className="filter">
          <div className="f">
            <label htmlFor="Location">Location</label>
            <input
              id="Location"
              type="text"
              placeholder="Location"
              onChange={onLocationChange}
              value={filterData.Location}
              autoComplete="off"
            />
          </div>
          <div className="f">
            <label htmlFor="rent">Rent</label>
            <input
              type="range"
              id="rent"
              min={20}
              max={20000}
              onChange={onRentChangeHandler}
            />
            <span>{filterData.Rent}</span>
          </div>
        </div>
        <div className="filter">
          <div className="f">
            <label htmlFor="Rating">Rating</label>
            <Select options={RatingOptions} placeholder="Rating" style={{width:"600px"}} onChange={(e)=>setFilterData({...filterData,Rating:e.value})}/>
          </div>
          <div className="f">
          <Button mt={"10px"} onFunc={onFliterTrigger}>Filter</Button>
          
          {/* <button className="signup btn" onClick={ResetFilterHandler}>
          Reset
        </button> */}
          </div>
        </div>
        <div className="filter">
          <div className="f">
          <label htmlFor="BHK">BHK</label>
            <Select options={[
                { value: "1BHK", label: "1BHK" },
                { value: "2BHK", label: "2BHK" },
                { value: "3BHK", label: "3BHK" },
                { value: "More", label: "More" },
              ]} placeholder="BHK"  onChange={(e)=>setFilterData({...filterData,BHK:e.value})} />
              
          </div>
        </div>
        <div className="filter">
        <div className="f">
            <label htmlFor="RelationShip">Relationship</label>
            <Select
              options={[
                { value: "Bachelor", label: "Bachelor" },
                { value: "Family", label: "Family" },
                { value: "Bachelor/Family", label: "Family/Bachelor" },
              ]}
              placeholder="Bachelor/Family"
              onChange={(e)=>setFilterData({...filterData,Relationship:e.value})}
            />
          </div>
        
          <div className="f">
          <Button mt={"5px"} p="10px 25px" color="#000" bgcolor={"#fff"} onFunc={ResetFilterHandler}>Reset</Button>
          </div>
       </div>
      </div>}
    </div>
  );
};

export default FilterMain;
