
// 4:28:00 - Store created
// 12MegaBlog/src/store/store.js
// KeyPoint : Store Banega Kaise ? 
// ConfigureStore hota hai, jo store banata hai (configure store mera – Hmesha Redux se hi aata hai) 
// And then, store ko chahiye ki mujhe saare reducers ke baare me batao 
// Bas itni kahani hai ! 


// STEP 01: Creating Store with the help of configureStore (that is always imported from reduxjs only)
import {configureStore} from "@reduxjs/toolkit";


// Step 02:  Store banate hai and isske liye configureStore ka use krna hoga 
// jo ki @reduxjs/toolkit se mil jaata hai.
//ConfigureStore ke ander ek object hai {}
const store = configureStore({
    //STEP : 04
    // Ab Store ke ander kya chahiye ?
    // ab configureStore ke ander ek hi parameter aata hai (reducers)
    // reducer mera object ke form me aata hai, and yaha usske ander kuch nhi h
    // so issko hum empty chor dete h
    reducer : {
        
    }
})


// STEP 03:
// Store ko export kr diye
export default store;