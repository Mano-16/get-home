import { NavLink,useNavigate } from "react-router-dom";
import "./Nav.css";
import {useDispatch, useSelector} from "react-redux"
import { authSliceActions } from "../../store/auth";

const Nav = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const LoggedIn = useSelector(state=>state.auth.isAuthenticated)
  const adminLoggedIn = useSelector(state=>state.auth.isAdmin)
  const pendingData = useSelector(state=>state.homeMain.ApprovalPendingRedux)
  const favouriteData = useSelector(state=>state.homeMain.favouritesRedux)
  

  const showLoginHandler=()=>{
    dispatch(authSliceActions.showloginpage())
    navigate("/auth")
  } 
  const showOwnerFormHandler =()=>{
    props.onShow()
  }
  const showApprovalHandler=()=>{
    props.onShowApproval()
  }
  const showFavouritesHandler=()=>{
    props.onShowFavourites()
  }
  const logOutHandler=()=>{
    dispatch(authSliceActions.LoggedOut())
    localStorage.removeItem("ID")
  }
  return (
    <nav className="navbarContainer">
      <div className="logo">
        <h3>GeTHome</h3>
      </div>
      <div className="mainNav">
        <NavLink to="/">Find your home</NavLink>
        <NavLink onClick={showOwnerFormHandler}>Add your home</NavLink>
      </div>  
      <div className="authentication">
        {adminLoggedIn && <button className="btn signup" onClick={showApprovalHandler}>
          Pending <span>{pendingData.length}</span>
        </button>}
        {!adminLoggedIn && LoggedIn &&  <button className="btn signup" onClick={showFavouritesHandler}>
          Favourites <span>{favouriteData.length}</span>
        </button>}
        {!LoggedIn && <button onClick={showLoginHandler} className="btn signin">
          Sign in
        </button>}
        {LoggedIn && <button className="btn signin" onClick={logOutHandler}>
          Sign out
        </button>}
        
        {/*   */}
      </div>
    </nav>
  );
};
export default Nav;
