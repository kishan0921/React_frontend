// Step 01:
//Ab aapko ek hi method chahiye jo slice bana dega, But hum 2 method use krenge.
// jo 1st method hai wo hai , createSlice and ye aayega reduxjs/ toolkit se
// 2nd method (nanoid))- kyuki mai todos 1,2,3.. krke create ni krna chahta, date se create krna chahhta hu.
//to hum nanoid use krenge - isska kaam ye hai, ki ye unique id generate krega bas. yahi kaam hai isska.
import { createSlice, nanoid } from "@reduxjs/toolkit";

// Step 02: Store Starting me kaisa dikhega (empty hoga ya kuch rahega)
// Store Starting me kaisa hoga, ? to Issiliye ek initialState(const variable) banayenge.

// Note: Ab initialState  kaisi rakhni hai
// 1. Array  (ye bhi ho skti hai,totally up to you)
// 2. object  (ye bhi ho skti hai,totally up to you) - Prefered

// Mai as object rakhta hu, Kyuki isske ander multiple chize aa skti hai.
// Jai mai 1st isske ander rakhta hu , todos name se ek state hai
const initialState = {
  // initialState object ke ander, todos name ka ek state hai.
  // ye todos kuch nhi ek array hai... and array ke ander mere objects honge.
  // Ab Bydefault, mai ek object add kr deta hu... taaki easy rahe hume.
  // object ki id 1 and text value "Hello world"
  todos: [{ id: 1, text: "Hello world" }],
};

// Step 03: Ab hum ek Slice Banayenge (Reducers)
// And what is Reducers ? - Kuch nahi ek functionality hai. bas

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
