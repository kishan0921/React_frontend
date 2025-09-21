import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    // sabse pehle mujhe state define krni h, individual todos ke liye.
    // todo - ye mera individual todo and then setTodo and ye dono mera state se aayega.
    // and default value todo and setTodo ki empty hogi.
    const [todo, setTodo] = useState("")

    // ab mujhe addTodo waala functionality use krna hai. ko ki app.jsx me likha hua h
    // and default empty function , context me banaya gya h.

    // to mai useTodo ko bol raha hu tmhare pass to bahut saari functionality h,
    // mai addTodo waala functionality de do. bas
    const {addTodo} = useTodo()

    // app ek method bana rahe h,then e - event aayega hi aayega
    //
    const add = (e) => {
        // ab event aa gya then, sabse pehle to e.preventDefault kro.
      e.preventDefault()

      // ab todo me kuch hona bhi chahiye.
      // agar kuch ni h to simply return kr do.
      if (!todo) return

      // agar kuch value hai , then 
      // addTodo ke ander object pass kro then usske ander todo de do
      //actual code - ({ id:Date.now(), todo:todo, completed: false})
      // id:Date.now(), - already jaga define kiye h present h ye, so yaha no need
      // todo: todo - so a/c to new rule agar aapki field and value ka name same h to. simply todo aise likh skte h
      // then hum completed ki value false de denge.
      addTodo({ todo, completed: false})

      // ab setTodo le lo and value empty kr do.
      setTodo("")
    }

  return (
    // submit hone pe add waala method use ho jaayega
      <form onSubmit={add}  className="flex">
          <input
              type="text"
              placeholder="Write Todo..."
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              
              // input field me mujhe wiring krni padegi, 
              // important -input value ko wrap up krna hoga state ke saath. 
              value={todo}
              // value={todo} issme kuch bhi change aaye to , humare state me daalo na.
              // onChange ho to, jo bhi mera event h , usse hum call krwa lenge setTodo ko then 
              // and jo value h event ke ander ko bhej do , wo set ho jaayega.
              onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
              Add
          </button>
      </form>
  );
}

export default TodoForm;