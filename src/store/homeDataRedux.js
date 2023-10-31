import {createSlice} from "@reduxjs/toolkit";
const homeState={homeMainRedux:[],ApprovalPendingRedux:[],favouritesRedux:[],filterHomeRedux:[],subFilterHomeRedux:[],isFiltered:0}
const homeSlice = createSlice({
    name:"mainHme",
    initialState:homeState,
    reducers:{
        AddHomeData(state,action){
            const homeData = action.payload
            state.homeMainRedux=homeData
        },
        RemoveHomeData(state,action){
            const id= action.payload
            state.homeMainRedux=state.homeMainRedux.filter((p)=>id!==p.key)
        },
        AddFavouritesData(state,action){
            const favouritesData = action.payload
            state.favouritesRedux=favouritesData
        },
        RemoveFavouritesData(state,action){
            const id= action.payload
            state.favouritesRedux=state.favouritesRedux.filter((p)=>id!==p.key)
        },
        AddApprovalPendingData(state,action){
            const ApprovalPendingData = action.payload
            state.ApprovalPendingRedux=ApprovalPendingData
        },
        RemoveApprovalPendingData(state,action){
            const id= action.payload
            state.ApprovalPendingRedux=state.ApprovalPendingRedux.filter((p)=>id!==p.key)
        },
        AddFilterHomeData(state,action){
            const filterHomeData = action.payload
            state.filterHomeRedux=filterHomeData
        },
        RemoveFilterHomeData(state,action){
            const id= action.payload
            state.filterHomeRedux=state.filterHomeRedux.filter((p)=>id!==p.key)
        },
        AddSubFilterHomeData(state,action){
            const filterHomeData = action.payload
            state.subFilterHomeRedux=filterHomeData
        },
        RemoveSubFilterHomeData(state,action){
            const id= action.payload
            state.subFilterHomeRedux=state.filterHomeRedux.filter((p)=>id!==p.key)
        },
        setIsFilter(state,action){
            const id = action.payload
            state.isFiltered=id;
        },
        RemoveFilter(state){
            state.isFiltered=false
        }

    }
})

export default homeSlice;
export const homeSliceActions = homeSlice.actions