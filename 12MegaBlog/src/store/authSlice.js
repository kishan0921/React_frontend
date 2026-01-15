// 2nd Store –Ab ek aur store banayenge, jo mera track krega saare authentication ko (Slice bana rahe hai)

// STEP : 00

// 1.name 
// 2.initialState
// 3.reducers



// STEP : 01
// ab slice banane ke liye mujhe, ek hi cheese chahiye "createSlice", 
// jo ki reduxjs toolkit se mil jaayega.
import { createSlice } from "@reduxjs/toolkit";


//STEP 03: 
// Slice to ban gayi hai, ab issko initialState bhi to chahiye hoga.
// ab store ka initialState banate hai.
// initial state me data ky h, Mai bas de raha hu (status , and userData)
const initialState = {
    // authentication ka statuss lunga, by default (user authenticated nhi hai. status-false)
    status : false,
    // ek mai aur dunga, userData (ki user ke baare me kuch information 
    // warega chahiye to le lunga, By default null  rahega)
    userData : null
}



// STEP : 02 
// Ab Slice Banane ke liye , mereko bas ek hi chiz chahiye createSlice () method ka use kr lenge.
// Note: ye jo slice hai humara , ye basically authentication ko track krne ke liye h
// IN short, user authenticated hai ya nahi, ye mai store se har baar puchunga.
// next initialState banao.
const authSlice = createSlice({
    // STEP :04 
    // Rule:To create any slice, you need 3 things
    // Ab jo slice hum banayenge, to pta h hume
    // 01.Name     
    // 02.initialState   
    // 03.reducers (reducers ke ander jo bhi hote hai, unke pass (state) and (action) ka access hota hai.)
    // ye sab dena hota ha, ek slice ko

    // 1st - name de dete hai, "auth"
    // slice jo banta hai , issme 1st name dena hota h
    name: "auth",
    // 2nd - initial state dena hota h (de dete hai, jo uppar banaya hai)
    initialState,
    // 3rd reducer dena hota h, 
    // reducers kya hai ? 
    // reducers ek object h- jo ki empty h abhi
    reducers : {
        // STEP : 06 
        //Note: 

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

// STEP : 05
//Ab hume pta hai, 2 chiz export krni hai.
// ek to ye authSlice me se, reducer export krna hai.... as default
export default authSlice.reducer;