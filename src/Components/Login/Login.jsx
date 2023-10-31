import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Home from "../../assets/Home.jpg";
import { LiaTimesSolid } from "react-icons/lia";
import {useDispatch} from "react-redux"
import { authSliceActions } from "../../store/auth";
import Portal from "../../Portal";

const Login = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [Error,setError] = useState({showError:false,errorMessage:"An Error"})
  const [loginInfo, setLoginInfo] = useState({emailID:"",password:"",nameOrRadio:""});
  // const [password, setPassword] = useState("");
  // const [nameOrRadio,setNameorRadio ] = useState("");
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const dispatch= useDispatch()
  const navigate=useNavigate()
  const hideLoginPageHandler=()=>{
    dispatch(authSliceActions.hideloginpage())
    navigate('/')
  }
  useEffect(()=>{
    if(loginInfo.emailID.includes("@") && loginInfo.password.length>=8 && loginInfo.nameOrRadio){
      setbuttonDisabled(false)
    }
  },[loginInfo])
  const loginHandler=async(e)=>{
    e.preventDefault()
    const {emailID,password,nameOrRadio}=loginInfo;
    let apiUrl
    if(!isLogin){
      apiUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4CK7BpMEIDsjpn8wC4q974-vYHs0c4xc"
    }
    else{
      apiUrl="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4CK7BpMEIDsjpn8wC4q974-vYHs0c4xc"
    }
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:emailID, password:password, returnSecureToken:true }),
      });
      if (response.ok) {
        const data = await response.json();
        if(isLogin){
          if(data.localId==="99jSfUGivEQpvczUwua2gmvVM9S2" && nameOrRadio==="Admin" ){
            dispatch(authSliceActions.AdminLoggedIn())
            dispatch(authSliceActions.LoggedIn())
            localStorage.setItem("ID",data.localId)
            console.log(`Logged in as ${data.email}`);
            dispatch(authSliceActions.hideloginpage())
            navigate("/")
          }
          else if(data.localId!=="99jSfUGivEQpvczUwua2gmvVM9S2" && loginInfo.nameOrRadio==="User"){
            dispatch(authSliceActions.LoggedIn())
            localStorage.setItem("ID",data.localId)
            console.log(`Logged in as ${data.email}`);
            dispatch(authSliceActions.hideloginpage())
            navigate("/")
          }
          else{
            setError({showError:true,errorMessage:"Role is incorrect"})
          }
        
        
        }
        else{
              setLoginInfo({emailID:"",password:"",nameOrRadio:""})
              setIsLogin((prevState) => setIsLogin(!prevState))
        }
      } else {
        const errorData = await response.json();
        if(errorData.error.message==="INVALID_LOGIN_CREDENTIALS"){
          setError({showError:true,errorMessage:"Invalid Credentials"})
        }
      }
    } catch (error) {
      console.log(error)
      setError({showError:true,errorMessage:`An error occurred: ${error.message}`})
    }
    
  }
  return (

    <div
      className="loginContainer"
      style={{ flexDirection: `${isLogin ? "row-reverse" : "row"}` }}
    >
      <form>
        <h2>{isLogin ? "Welcome Back!" : "Hey, Come here"}</h2>
        <p>Live or let alive!</p>
        {!isLogin && (
          <div>
            <label className="textLabel">Name</label>
            <input type="text" placeholder="Name" required  value={loginInfo.nameOrRadio} onChange={(e)=>setLoginInfo({...loginInfo,nameOrRadio:e.target.value})}/>
          </div>
        )}
        <div>
          <label className="textLabel">Email</label>
          <input type="email" placeholder="findyourhouse@gmail.com" required  value={loginInfo.emailID} onChange={(e)=>setLoginInfo({...loginInfo,emailID:e.target.value})} />
        </div>
        <div>
          <label className="textLabel">Password</label>
          <input type="password" placeholder="**********" required value={loginInfo.password} onChange={(e)=>{setLoginInfo({...loginInfo,password:e.target.value})}}/>
        </div>
        {isLogin && (
          <div>
            <label>Admin</label>
            <input id="admin" name="user-permission" type="radio" value = "Admin" required onChange={(e)=>{setLoginInfo({...loginInfo,nameOrRadio:e.target.value})}}/>
            <label className="radioLabel">User</label>
            <input id="user" name="user-permission" type="radio" value = "User" required onChange={(e)=>{setLoginInfo({...loginInfo,nameOrRadio:e.target.value})}} />
          </div>
        )}
        <button disabled={buttonDisabled} onClick={loginHandler}>{isLogin ? "Log In" : "Sign up"}</button>
        <span onClick={hideLoginPageHandler}>
          <LiaTimesSolid />
        </span>
      </form>
      <div className="loginToSignup">
        <h1>Get Your Rental Place!</h1>
        <div className="homeLogo">
          <img src={Home} alt="HomeLogo" />
        </div>
        <p>
          {isLogin ? "Don't have account?" : "Already have account?"}
          <Link
            onClick={() => setIsLogin((prevState) => setIsLogin(!prevState))}
          >
            {isLogin ? "Create an account" : "Login in here"}
          </Link>
        </p>
      </div>
      {Error.showError && <div style={{cursor:"pointer"}} className={Error.showError?"loginError active" : "loginError"}>{Error.errorMessage} <LiaTimesSolid onClick={()=>setError({showError:false,errorMessage:""})}/></div>}
    </div>
  );
};

export default Login;
