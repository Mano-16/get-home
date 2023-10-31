import { useState, useEffect, Fragment } from "react";
import "./App.css";
import HomeCardData from "./Components/Card/DataHomeCard";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Nav from "./Components/Nav/Nav";
import Portal from "./Portal";
import { useSelector, useDispatch } from "react-redux";
import { authSliceActions } from "./store/auth";
import CardInput from "./Components/Input/CardInput";
import AddHome from "./Components/AddHome/AddHome";
import FilterIcon from "./Components/Filter/FilterIcon";
import Approval from "./Components/Approval/Approval";
import Favourites from "./Components/Favourites/Favourites";
import { getHomeData } from "./lib/api";
import { homeSliceActions } from "./store/homeDataRedux";
import FilterMain from "./Components/Filter/FilterMain";
import DeletePopup from "./Components/ReuseComponents/DeletePopup";
import { Routes,Route } from "react-router-dom";
import FullHomeDetails from "./Components/FullHomeDetails/FullHomeDetails";
import LoaderSpinner from "./Components/ReuseComponents/Loader";
import ImageSlider from "./Components/ReuseComponents/ImageSlider";

function App() {
  const [showOwnerForm, setShowOwnerForm] = useState(false);
  const [showApproval, setShowApproval] = useState(false);
  const [showFavourites, setShowFavourites] = useState(false);
  const [showFilter, setShowfilter] = useState(false);
  const [showPopup, setshowDeltePopup] = useState(false);
  const [deleteKeyvalue, setDeleteKeyValue] = useState();
  const [status, setStatus] = useState({
    isSubmitting: true,
    didSubmit: false,
  });
  const UserID = localStorage.getItem("ID")
  const dispatch = useDispatch();
  const showLoginPage = useSelector((state) => state.auth.isloginShow);
  useEffect(() => {
    getHomeData(
      `https://rental-ui-89316-default-rtdb.firebaseio.com/Favourites/${UserID}/.json`,
      "GET"
    ).then((res) => dispatch(homeSliceActions.AddFavouritesData(res)));
  }, []);
  useEffect(() => {
    getHomeData(
      "https://rental-ui-89316-default-rtdb.firebaseio.com/PendingApproval/.json",
      "GET"
    ).then((res) => dispatch(homeSliceActions.AddApprovalPendingData(res)));
  }, []);
  const hideLoginPageHandler = () => {
    dispatch(authSliceActions.hideloginpage());
  };
  const showOwnerFormHandler = () => {
    setShowOwnerForm((prevState) => !prevState);
  };
  const showApprovalHandler = () => {
    setShowApproval((prevState) => !prevState);
  };
  const showFavouritesHandler = () => {
    setShowFavourites((prevState) => !prevState);
  };
  const showFilterHandler = () => {
    setShowfilter((prevState) => !prevState);
  };
  const showDeletePopuphandler = (key) => {
    setDeleteKeyValue(key)
    setshowDeltePopup((prevState) => !prevState);
  };
  useEffect(() => {
    
    getHomeData(
      "https://rental-ui-89316-default-rtdb.firebaseio.com/HomeDetails/.json"
    ).then((res) =>{ dispatch(homeSliceActions.AddHomeData(res))
      setStatus({isSubmitting:false,didSubmit:true})
    });
  }, []);

  return (
    <>
      <Nav
        onShow={showOwnerFormHandler}
        onShowApproval={showApprovalHandler}
        onShowFavourites={showFavouritesHandler}
      />
      <Routes>
        <Route exact path="/" element={<Fragment><Home/>
       {status.isSubmitting &&  <LoaderSpinner/>}
        {status.didSubmit && <HomeCardData onShow={showDeletePopuphandler} />}</Fragment>}/>
        <Route path="details/:ID" element={<FullHomeDetails/>}/> 
      </Routes>
      {/* <Home />
      <FilterIcon onShow={showFilterHandler} />
      <HomeCardData onShow={showDeletePopuphandler} /> */}
      <Portal show={showLoginPage} onClose={hideLoginPageHandler}>
        <Login />
      </Portal>
      <Portal show={showOwnerForm}>
        <AddHome onShow={showOwnerFormHandler} />
      </Portal>
      <Portal show={showApproval}>
        <Approval onHideApproval={showApprovalHandler} />
      </Portal>
      <Portal show={showFavourites}>
        <Favourites onHide={showFavouritesHandler} />
      </Portal>
      <Portal show={showPopup}>
        <DeletePopup onHide={showDeletePopuphandler} keyValue={deleteKeyvalue} />
      </Portal>
    </>
  );
}

export default App;
