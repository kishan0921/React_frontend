import React, { useState } from "react";
// Ab, dispatch kaha se aayega, Import kr lete hai "react-redux se"
import { useDispatch } from "react-redux";

// Individual , addTodo waala reducer le aate hai. taaki call kr skke isse.
import { addTodo } from "../features/todo/todoSlice";

function AddTodo() {
  // Step 01: Sabse pehle state banate hai, Ab kyuki state ka name already present hai.
  // input , setinput to yahi use krte hai.

  // Method 01:
  // const[input, setInput] = React.useState('');

  // Method 02:
  // Import karo , import React, { useState } from "react";
  // use Karo aise
  // const [input, setInput] = useState("");

  const [input, setInput] = useState("");

  // Step 02: Now, Ab maine aapko bataya, mujhe dispatch chahiye hoga.
  // Ab, dispatch kaha se aayega, Import kr lete hai "react-redux se"
  // Then, Use kaise karenge ?
  // Simple hai, useDispatch () method ka value ek const varible me assign kr do.
  const dispatch = useDispatch();

  // Step 03:
  // Ab Dispatch ko kaise Use krte hai ?
  // Humne,ek method bana rakha hai from me "addTodoHandler".
  //Ab, hume functionality nahi likhni hai,
  // Hume simply,kya karna hai ek method banana hai
  // to humne ek const addTodoHandler banaya, then isske pass aayega ek event (e)
  // then ye lijiye arrow function =>{}
  const addTodoHandler = (e) => {
    // then arrow function ke ander,
    // 1st :-
    // Ab e.preventDefault kar do,kyuki form directly submit ho jaata hai.
    e.preventDefault();

    // 2nd :
    //Ab sidha ka sidha dispatch ka use kro,
    // Rule : 0
    //DISPATCH :- ab Dispatch kya krta hai,  dispatch
    //ek reducers ko use krte hue, directly store me change krta hai.
    //Inshort : dispatch, reducers ka use krte hue , store me
    //value add krta hai.

    // So,Dispatch() method ko call kro.
    //Then, mujhe yaha individual addTodo waala reducer ko call krna hai,
    // export to hai hi, todoSlice.js file me, ab bas yaha le aate hai.
    // Ab dispatch ke ander hi, reducer ko call krna hota hai (addTodo())
    // then,iss reducer ke ander jo value bhejna hai bhej skte ho.
    // Ab,addTodo reducer ke ander aap expect kr rahe ho, ki aap
    // text: action.payload bhejoge.
    // To hum simple, addTodo waale reducer ko call kr rahe and value send kr rahe h(input)
    // ko ki "addTodo" reducer ke Text waale value jaayega, as (input) waala value
    dispatch(addTodo(input));

    // Now, ab aapne input field to banaya form me , but ussko clean ni kiya
    //Agar apne clean ni kiya, then form filled show krega, user ko. So clean krte hai form ko.
    // setInput use kr liye, and usska state wapas se empty/clean kr do.Bas
    setInput("");
  };

  // ye niche sirf ek form hai,copy-paste hi code kiya gya hai.
  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add Todo
      </button>
    </form>
  );
}

export default AddTodo;
