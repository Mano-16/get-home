import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Home from "../../assets/Home.jpg";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../../store/auth";
import Portal from "../../Portal";
import { Formik, useFormik } from "formik";
import { LoginValidation, SignupValidation } from "../Validation";

const initialValues = {
  Signup: {
    Signupname: "",
    Signupemail: "",
    Signuppassword: "",
  },
  Login: {
    Loginemail: "",
    Loginpassword: "",
    Userpermission: "",
  },
};
const Login = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const [Error, setError] = useState({
    showError: false,
    errorMessage: "An Error",
  });
  const [loginInfo, setLoginInfo] = useState({
    emailID: "",
    password: "",
    nameOrRadio: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hideLoginPageHandler = () => {
    dispatch(authSliceActions.hideloginpage());
    navigate("/");
  };

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialValues.Signup,
      validationSchema: SignupValidation,
      onSubmit: (values) => {
        loginHandler(
          values.Signupemail,
          values.Signuppassword,
          values.Signupname
        );
      },
    });

  const LoginFormik = useFormik({
    initialValues: initialValues.Login,
    validationSchema: LoginValidation,
    onSubmit: (values) => {
      loginHandler(
        values.Loginemail,
        values.Loginpassword,
        values.Userpermission
      );
    },
  });

  const loginHandler = async (emailID, password, nameOrRadio) => {
    // const { emailID, password, nameOrRadio } = loginInfo;
    let apiUrl;
    if (!isLogin) {
      apiUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4CK7BpMEIDsjpn8wC4q974-vYHs0c4xc";
    } else {
      apiUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4CK7BpMEIDsjpn8wC4q974-vYHs0c4xc";
    }
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailID,
          password: password,
          returnSecureToken: true,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (isLogin) {
          if (
            data.localId === "99jSfUGivEQpvczUwua2gmvVM9S2" &&
            nameOrRadio === "Admin"
          ) {
            dispatch(authSliceActions.AdminLoggedIn());
            dispatch(authSliceActions.LoggedIn());
            localStorage.setItem("ID", data.localId);
            console.log(`Logged in as ${data.email}`);
            dispatch(authSliceActions.hideloginpage());
            navigate("/");
          } else if (
            data.localId !== "99jSfUGivEQpvczUwua2gmvVM9S2" &&
            nameOrRadio === "User"
          ) {
            dispatch(authSliceActions.LoggedIn());
            localStorage.setItem("ID", data.localId);
            console.log(`Logged in as ${data.email}`);
            dispatch(authSliceActions.hideloginpage());
            navigate("/");
          } else {
            setError({ showError: true, errorMessage: "Role is incorrect" });
          }
        } else {
          setLoginInfo({ emailID: "", password: "", nameOrRadio: "" });
          setIsLogin((prevState) => setIsLogin(!prevState));
        }
      } else {
        const errorData = await response.json();
        setError({showError:true,errorMessage:errorData.error.message})
        // if (errorData.error.message === "INVALID_LOGIN_CREDENTIALS") {
        //   setError({ showError: true, errorMessage: "Invalid Credentials" });
        // }
        // else
      }
    } catch (error) {
      setError({
        showError: true,
        errorMessage: `An error occurred: ${error.message}`,
      });
    }
  };
  const submitFunction = isLogin ? LoginFormik.handleSubmit : handleSubmit;
  return (
    <div
      className="loginContainer"
      style={{ flexDirection: `${isLogin ? "row-reverse" : "row"}` }}
    >
      <form>
        <h2>{isLogin ? "Welcome Back!" : "Hey, Come here"}</h2>
        <p>Live or let alive!</p>
        {!isLogin && (
          <div className="LoginForm">
            <div>
              <label className="textLabel">Name</label>
              <input
                type="text"
                placeholder="Name"
                name="Signupname"
                onBlur={handleBlur}
                value={values.Signupname}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.Signupname && touched.Signupname && (
                <small>{errors.Signupname}</small>
              )}
            </div>
            <div>
              <label className="textLabel">Email</label>
              <input
                type="email"
                placeholder="findyourhouse@gmail.com"
                name="Signupemail"
                onBlur={handleBlur}
                value={values.Signupemail}
                onChange={handleChange}
                autoComplete="off"
              />
              {errors.Signupemail && touched.Signupemail && (
                <small>{errors.Signupemail}</small>
              )}
            </div>
            <div>
              <label className="textLabel">Password</label>
              <input
                type="password"
                placeholder="**********"
                name="Signuppassword"
                onBlur={handleBlur}
                value={values.Signuppassword}
                onChange={handleChange}
              />
              {errors.Signuppassword && touched.Signuppassword && (
                <small>{errors.Signuppassword}</small>
              )}
            </div>
          </div>
        )}

        {isLogin && (
          <div className="LoginForm">
            <div>
              <label className="textLabel">Email</label>
              <input
                type="email"
                placeholder="findyourhouse@gmail.com"
                name="Loginemail"
                onBlur={LoginFormik.handleBlur}
                value={LoginFormik.values.Loginemail}
                onChange={LoginFormik.handleChange}
                autoComplete="off"
              />
              {LoginFormik.errors.Loginemail &&
                LoginFormik.touched.Loginemail && (
                  <small>{LoginFormik.errors.Loginemail}</small>
                )}
            </div>
            <div>
              <label className="textLabel">Password</label>
              <input
                type="password"
                placeholder="**********"
                name="Loginpassword"
                onBlur={LoginFormik.handleBlur}
                value={LoginFormik.values.Loginpassword}
                onChange={LoginFormik.handleChange}
              />
              {LoginFormik.errors.Loginpassword &&
                LoginFormik.touched.Loginpassword && (
                  <small>{LoginFormik.errors.Loginpassword}</small>
                )}
            </div>
            <div>
              <label>Admin</label>
              <input
                id="admin"
                name="Userpermission"
                type="radio"
                value="Admin"
                onChange={LoginFormik.handleChange}
              />
              <label className="radioLabel">User</label>
              <input
                id="user"
                name="Userpermission"
                type="radio"
                value="User"
                onChange={LoginFormik.handleChange}
              />
            </div>
            {LoginFormik.errors.Userpermission &&
              LoginFormik.touched.Userpermission && (
                <small>{LoginFormik.errors.Userpermission}</small>
              )}
          </div>
        )}
        <button onClick={submitFunction}>
          {isLogin ? "Log In" : "Sign up"}
        </button>
        {/* <button disabled={buttonDisabled} onClick={loginHandler}>{isLogin ? "Log In" : "Sign up"}</button> */}
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
      {Error.showError && (
        <div
          style={{ cursor: "pointer" }}
          className={Error.showError ? "loginError active" : "loginError"}
        >
          {Error.errorMessage}{" "}
          <LiaTimesSolid
            onClick={() => setError({ showError: false, errorMessage: "" })}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
