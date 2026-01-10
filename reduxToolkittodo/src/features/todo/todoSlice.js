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

// function sayHello(){
//     console.log("Hello world")
// }

// And what is Reducers ? - Kuch nahi ek functionality hai. bas

// To hum ek variable Banayenge, "todoSlice" name se and export bhi kr lenge yahi pehli
// Taaki Aur Jagah isse use kr skke.

//and ye todoSlice variable mera, ek Slice hoga... Ab banega kaise?
// Ek hi to method hai createSlice() isski help se.
// iss createSlice({})- method ke ander mostly objects use hoga/ ya aayega.
export const todoSlice = createSlice({
  // 01- Ab Slices ke name hote hai. (thoda soch kar rahkna, kyuki jab hum React Devtool Extension use krenge,
  // Tab yahi name show hoga...wooha pe)
  name: "todo", // 'todo' name as string le rahe hai, to koi farak ni padega.
  // 02-Ab har slice ka, initial state hoga hai.
  // Humne to Already banaya hai uppar to use kr lete hai, warna yaha hum new Bhi bana skte hai.
  initialState,

  // 03- Most Important (Jisske liye mera Store incomplete hai, reducers bana lete hai.)
  // yaha Reducers kya hai ? ek Property hai.
  // reducer me hum object lenge.
  reducers: {
    // Ab isske ander
    // 1. Property  and
    // 2. Function aayenge

    // 1.addTodo: ye meri Property hai, and
    // 2. Function yaha bhi define kr skte hai ,

    // Meethod 01:
    // ya already uppar create k reference pass kr skte hai
    // Like - addTodo: sayHello
    // addTodo: sayHello  - Also use like this way also

    //Method 02:
    // Yaahi pe mera change aata hai, Redux and ReduxToolkit ka.
    // OLD Trick :Context Api me hum aise likh rahe the,
    // Hum function declare kr rahe the, but definition ni kr rahe the.
    // Like this way ----
    // addTodo: () =>{}
    // removeTodo : () => {}

    //NEW TRICK: Yaha hum redux toolkit me hum,
    // hum function ka declaration bhi kr rahe hai, and definition kr rahe hai.
    // Note: Jab bhi ek Property add Karenge(Like - addTodo)
    // to humesha hum 2 chize ka access milega (as Rule/ Syntax yaad kr lo).
    // 1.State - ek milega state
    //2.action - Ek milega action
    // Inn dono ka humesha hi aapke pass access rhega.

    // 1.STATE :-
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
