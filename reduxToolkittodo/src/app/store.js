// Ab Store banane ka ek process hai

// Step 01:
// sabse pehli jo chiz hai wo hai, configureStore Method...
// ye hume le kar aana hoga @reduxjs/toolkit se, Kyuki yahi wo method hai, jisse store kaam krta hai
// And ye mera core redux se aaya hai, nahi ki react-redux se.
// Now, Store Ban gaya hai , But ye Properly ready nahi hai use-case ke liye. [continue1.]
import { configureStore } from "@reduxjs/toolkit";

// Step 03: Store ko Knowledge de do,Reducers ke baare me
// Sabse pehle jo humare, todoReducer hai ussko le aao
// Then , configureStore ke ander issko Rakh do [continue2..]
import todoReducer from "../features/todo/todoSlice";

// Step 02:
// [continue1.] Store ready nahi hai, But firbhi "configureStore" method k use krke hum
// ek variable export kr dete hai "store" name ka.

// Ek const variable bana rahe hai "Store" name se and yahi issko export bhi kr rahe hai.
// and Store variable aayega kaha se - configureStore () method se
// and configureStore({}) - most of the chize as {} object hi lega apne ander.
// But ye abhi ready nahi hai [1:35:00] tk
export const store = configureStore({
  // [continue2..]
  // Note: As key-value reducer rakhenge.
  // Ab hume store ke ander rakhna kaise hai, Kuch ni as Key-value yaaha pe daal do.
  // Key Mera: Reducer hai (reducer ki poori list bhi de skte ho, But yaha 1 hi reducer hai apne pass abhi)
  // Value as todoReducer rakhenge.
  reducer: todoReducer,
});
