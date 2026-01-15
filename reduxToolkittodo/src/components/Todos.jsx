import React from "react";
// Hume information lena hai, jo ki store ke pass hai, to hum useSelector() ka use krenge,
// jo ki react-redux ke pass hai, so import kr lete hai usse.
// Ab jo information aayegi, store se ussmese aap kuch delete bhi to kroge
// So, modification waala kam krna hai to useDispatch() method ka use bhi hoga, to ussko bhi import kr lete h
import { useSelector, useDispatch } from "react-redux";

// Ab dispatch use kiya hu, to koi na koi,mere pass reducer hoga , jisske through hum modification krenge, store me
// to removeTodo reducer ko import kr lete hai,Slice(reducer) se
import { removeTodo } from "../features/todo/todoSlice";

function Todos() {
  // Step :01 Ab hum todos kaise Laaye? - useSelector() ka use krke
  //Ab advantage ye h ki,Iss method ke ander hume State ka access milta hai.Ek callback ke ander.
  // then , state ka access mil gaya then, iss state ke ander se jo bhi value chahiye wo nikal lijiye.
  // mai state ke ander se todos ki value nikalna chahta hu.(todos - initialState me hai, and updated bhi h, sab value hai isse pass)
  // and jo bhi value aayegi, ussko hold/ rakh lete hai ek varible ke ander.
  const todos = useSelector((state) => state.todos);

  // Step 02:
  // Hun modification/dispatch bhi kreeng to ussko bhi hold kr lete hai,dispatch variable me.
  const dispatch = useDispatch();

  return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {/* saare ke saare todos lo , jo ki store se aaye hai, then map lo then, loop chala do 
         har ek todo pe
        */}
        {todos.map((todo) => (
          //  ab mujhe ek li/div kuch bhi le lo, then key-value lena hoga,
          // to mujhe pta hai todo ke ander id hai. to acceess kr lete hai (todo.id)
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            {/* // Then, ab yaha bas mujhe dena hai, uss value ko todo.text waala ko{todo.text}  */}
            <div className="text-white">{todo.text}</div>
            {/* Ab ek button bana lete hai, then ab iss button ko kaise use krna h?
            kuch nhai,button onClick{} hone pe, onClick ke ander hume ab ye krna
            hai,hume call krna hai dispatch(), then isske ander reducer ko call
            kro(removeTodo) 
             */}
            {/* Most Important: onclick ke ander mujhe call krna */}
            {/* hai, dispatch() method. like- onclick{dispatch()}. But ye allowed ni h
            onclick ke ander hum bas reference de skte hai, onclick{yaha reference de do}

            But,Hume to method call krna hai onclick ke ander,So
            Hum ek callback ka use kr lenge, onclick{} ke ander then, dispatch() method call krenge. */}
            {/* Note: Jb bhi aise method ke ander parmeter pass krne hote hai, to
            hum ek callback fire krte hai ()=> - Agar {} laagate hai to
            immediately execute ho jaayega, but hume to use execute krna hai,
            jab koi use button pe click kre, Issliye hum callback use krte hai. */}

            <button
              // Simply, humne dispatch() method call kiya then, removeTodo reducer call kiya then,isske ander wo id de do,
              // Jiss todo ki id aapko delete krni hai...bas simple
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
