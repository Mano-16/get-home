import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../store/auth.js"
import homeSlice from "./homeDataRedux.js";

const store = configureStore({
    reducer:{auth:authSlice.reducer,homeMain:homeSlice.reducer}
})

export default store;