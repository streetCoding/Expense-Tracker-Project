import { createSlice } from '@reduxjs/toolkit';
import firebase from 'firebase/app';


const auth = createSlice({
    name: "authReducer",
    initialState: false,
    reducers: {
        authReducer(state, action){
        return action.payload
        }
    }
});

export const {authReducer} = auth.actions;
export default auth;
