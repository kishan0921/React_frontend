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

    // Ab dono ko kaam me kaise lete hai, wo baatata hu.
    // 1.STATE (Current initialState ke ander jo hai usska access deta hai):- state jo variable hai, wo mereko acces dega like
    // Abhi jo meri,"initialState" hai, wo aage jaa kar obviously change ho jaayegi.
    //To state hume, currently initialState me kya hai usska access dega. (abhi 1 todos hai - to usska access hai mere pass)
    // waise hi 10 todos hote to sabka access hota mere pass.

    //2.ACTION: access kuch ni hota, kaayi baar hota hai, like-
    // remove, Aise hi haawa me to remove ni ho jaayega, remove krne ke liye mujhe Id chahiye hogi.
    // To kuch value mujhe bhi to laagegi, jab mai removeTodo (method) ko call krunga.
    // To wo values, Kaha se milegi? - Action me se milti hai.

    addTodo: (state, action) => {
      // Now, Ab kuch ni krna Add todo krna hai.
      // Ab todo kaise milega ?
      // Jaise Id milegi, waise hi todos bhi milega.
      // to Chalo ek new todos bana lete hai.
      // And todo kaise banega ? - ek object se

      const todo = {
        id: nanoid(), //(Id unique honi chahiye - Date.now()/ nanoid() method yaha hum use kr rahe h)
        text: action.payload, // (text hum  action ke ander payload se nikalenge)
      };
      // Ab todo to ban gaya hai.Lakin state kr ander thodi update hua hai.
      // currently, initialState me jo hai wohi state me hai...so State ko update krna hoga.

      // Now, State ko update krenge.
      // state ka access lo, state ke ander aapne todos liye hai.
      // Note: (initialState) hi mera state hai
      // then state ke ander todos ke ander hum ye new todo push kr denge.
      // then state update ho gya.
      state.todos.push(todo);
    },

    // Now, remove - Pure mera Revision kar lete hai.
    // Point 01: removeTodo Method ke ander mujhe 2 chiz ka access milega hmesha (state, action)
    // Point 02: State ke ander - Current State/ initialState jo bhi h currently wo milta hai
    // Point 03: Action ke ander - jo bhi data passs ho raha hai.
    // Ab Mujhe pta hai, remove krne ke liye action ke ander inhone ek ID bheja hi hoga.
    // To Agar Id bheja hoga, to hum ek filter() method laga denge apne todos pe.
    // and jo bhi action.payload wo agar mera match ho jaata hai (todo.id) se then remove kr do. Ussko nahi lenge.
    // Baaki ko le lenge.

    removeTodo: (state, action) => {
      // state/initialState le lete hai then state ke ander mera todos ka access hai.
      // then issko override kr denge.
      // state.todos se then filter() method ka use kr lenge.
      // then filter() ke ander hume har ek todo ka acces milega.
      //then har ek todos ka acces lenge to kya bolenge ussko ?
      //Kuch ni, jo mera todo hai usske pass id hogi, ussko match kr lo ki wo nahi match honi chahiye action.payload se
      // Then, automatically wo id compare kr lega..EASY EASY !
      // jo nahi match kr raha usska value true ho jaayega -and remove ho jaayega
      // and baaki ka false and show ho jaayega.
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },

  // Aise hi aap aur bhi reducers add kr skte ho. (update waala aap baanana)
});

// STEP 04:
// MOST: IMP - Ye bhi RULE: Uppar todoSlice me hum reducers export kr diya hai.
// Lakin aise export ni hota, aapko 2 part isske export krne hote hai.

// 1st Part:-Jitni bhi reducers ki functionality hai ussko export Karenge.
// and ye reducer ki value kaha se aayegi. todoSlice.action se mujhe reducer ko value (addTodo, removeTodo) mil jaayegi
// Ye individual functionality humne export ki hai....jisse ye humare component me kaam aayega
export const { addTodo, removeTodo } = todoSlice.actions;

// 2nd Part:-Ab aapko yaad hoga, humare pass store hai, to usssko bhi saari awareness
// chahiye inn saare reducers ke baare me.
// Agar store ko awareness nahi hai ? - Then store ye newly created reducers nahi maintain kr paayega.
// Kyuki Store mera restricted hai.
// Store bolta hai ki , mai value har kisi se lekar update ni krta.
// Store ke ander aap jo jo reducer register kroge....mai unnse hi bas value le kar update krta hu.
// To store ko saare ke saare reducer ka list chahiye hota hai.

// To Yaha mere saare reducer todoSlice ke ander reducer me hai to ussko export kr dete hai.
// Hamesha koi bhi reducers banega baad me export hoga hi issi tarike se.... Taaki hum ussko component me use kr skke
export default todoSlice.reducer;
