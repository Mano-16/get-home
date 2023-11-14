import {createSlice} from "@reduxjs/toolkit";
const ID = localStorage.getItem("ID")
const authSlice = createSlice({
    name:"auth",
    initialState:{isloginShow: false,isAuthenticated: ID ? true : false,isAdmin: ID==="q3H7YUQO5MSccngRmPMobeT3q473" ? true:false},
    reducers:{
        showloginpage(state){
            state.isloginShow=true;
        },
        hideloginpage(state){
            state.isloginShow=false
        },
        LoggedIn(state){
            state.isAuthenticated=true
        },
        LoggedOut(state){
            state.isAuthenticated=false
            state.isAdmin=false
        },
        AdminLoggedIn(state){
            state.isAdmin=true
        }

    }
})

export default authSlice;
export const authSliceActions = authSlice.actions