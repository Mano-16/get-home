import {createSlice} from "@reduxjs/toolkit";
const pendingApproval={
    pending:[]
}
const pendingSlice = createSlice({
    name:"pending",
    initialState:pendingApproval,
    reducers:{
        AddPending(state,action){
            const newPending = action.payload
            state.pending=newPending
        },
        RemovePending(state,action){
            const id= action.id
            state.pending=state.pending.filter((p)=>id!==p.id)
        }
        // hideloginpage(state){
        //     state.isloginShow=false
        // },
        // LoggedIn(state){
        //     state.isAuthenticated=true
        // },
        // LoggedOut(state){
        //     state.isAuthenticated=false
        //     state.isAdmin=true
        // },
        // AdminLoggedIn(state){
        //     state.isAdmin=true
        // }

    }
})

export default authSlice;
export const authSliceActions = authSlice.actions