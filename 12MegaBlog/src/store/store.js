
import {configureStore} from "@reduxjs/toolkit";


// Step 01:  Store banate hai
const store = configureStore({
    // ab configureStore ke ander ek hi parameter aata hai 
    // reducer jo ki object ke form me hai, and yaha usske ander kuch nhi h
    // so issko hum empty chor dete h
    reducer : {
        
    }
})


// Store ko export kr diye