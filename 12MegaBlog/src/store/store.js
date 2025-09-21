
// 4:28:00 - Store created
// and store ka ye hai ki, mujhe saare reducer ke baare me batao
// 12MegaBlog/src/store/store.js

import {configureStore} from "@reduxjs/toolkit";


// Step 01:  Store banate hai and isske liye configureStore ka use krna hoga 
// jo ki @reduxjs/toolkit se mil jaata hai.
const store = configureStore({
    // ab configureStore ke ander ek hi parameter aata hai 
    // reducer jo ki object ke form me hai, and yaha usske ander kuch nhi h
    // so issko hum empty chor dete h
    reducer : {
        
    }
})


// Store ko export kr diye