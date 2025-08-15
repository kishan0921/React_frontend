import { createSlice } from "@reduxjs/toolkit";


// ab store ka initialState banate hai.
// initial state me data ky h
const initialState = {
    status : false,
    userData : null
}


// Ab ek slice bana lenge
// Note: ye jo slice hai humara , ye basically authentication ko track krne ke liye h
// IN short, user authenticated hai ya nahi, ye mai store se har baar puchunga.
const authSlice = createSlice({
    // slice jo banta hai , issme 1st name dena hota h
    name: "auth",
    // 2nd - initial state dena hota h
    initialState,
    // 3rd reducer dena hota h, and reducer ek object h- jo ki empty h
    reducers : {
        // ab jo hai, reducer me jo exponential function h, ussko bhi export krne pdte h
        // login jo hai, hume pata hai usske ander state and action ka access hota h
        // action - ke ander milta hai payload
        // state - and state me jo bhi value update krna hota h wo
        login : (state, action) => {
            // now, agar ye login method, kisine dispatch kiya h to 
            // to sabse pehle  state lo and status = true kr do
            state.status = true;
            // status = true hone ke baad, ussme userData bhi add krna hoga
            // and userData jo hai state se aayega, and userData jo hai wo action.payload se aayega
            state.userData = action.payload.userData;
        },
        // Ek aur method yaha hum dispatch kr skte hai, jisska name h "logout"
        // Jab logout kr rahe hai to mujhe state ki zarurat h, "action" ka bhi access h,but zarurat nhi h yaha pe
        logout: (state) => {
            // now, ab mai status lunga and false kr dunga
            state.status = false;
            // then userData ko null kr denge
            state.userData = null;
        }


    }
});



// Now export kr lete hai authslice ke action me se
// and particular 2 chiz export karenge - login, logout
// Finally, store ready hai and store ke saath reducer bhi ready hai
export const {login, logout} = authSlice.actions;

// now authSlice ko export krenge, and issko bol denge authSlice me se reducer export kr do
export default authSlice.reducer;