import React, { useState } from 'react'

// sabse important things ye h ki contexts le kaar aao, kyuki usse hi to saari functionality aayegi.
import { useTodo } from '../contexts/TodoContext';

function TodoItem({ todo }) {
  //useTodo() se ky ky functionality aapko chahiye, wo destructure kr lo.
  const {updateTodo, deleteTodo, toggleComplete} = useTodo()

  // Ab banate h state, zaada ni sirf 2 hi state banani padegi.
  // 1st isTodoEditable and by default value false kr dete h, ki todos editable ni h
  const [isTodoEditable, setIsTodoEditable] = useState(false)
  // 2nd - todo ke ander humara message ky h,to hume todoMsg lena hoga,ans setTodoMsg 
  // and ye value aayegi useState se and by default value rahegi,ki jo bhi mera todo hai hai, usske ander .todo
  const [todoMsg, setTodoMsg] = useState(todo.todo)


  // chalo ab functionality define krte h,

  // to hum editTodo functionality banayegnge.

  const editTodo = () => {
    // isske ander sabse pehle call krna hoga, updateTodo 
    //note: jab update hoga to mujhe id chahiye hogi kisse update krna h and 
    // then message, new todo ka message update krna h.
    
    // 1st todo id de do = todo.id se
    // 2nd ab era todo object h so {} aise krenge
    // then ...todo saari old todo value le aaye h, then 
    // ab mujhe bas ...todo me bas 1 property update krni h 
    // todo: todoMsg bas.
    updateTodo(todo.id, {...todo, todo: todoMsg})
    // then isTodoEditable false set kr diya.
    setIsTodoEditable(false)
  }


  // toggle completed waala functionality, banana hoga
  // but already functionality defined h, to simple hum call kr denge 
  // and use kr lenge existing waala functionality.
  // yaha toggleCompleted mere method ka name hai.
  const toggleCompleted = () => {
    //console.log(todo.id);
    // and toggleComplete ye mere context se aa raha h usska value h
    // then toggle krne ke liye mujhe id pass krni hogi. to pass diya mai.(todo.id)
    toggleComplete(todo.id)
  }

  return (
      <div
          className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
              todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
          }`}
      >
          <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.completed}
              onChange={toggleCompleted}
          />
          <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                  isTodoEditable ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isTodoEditable}
          />
          {/* Edit, Save Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                  if (todo.completed) return;

                  if (isTodoEditable) {
                      editTodo();
                  } else setIsTodoEditable((prev) => !prev);
              }}
              disabled={todo.completed}
          >
              {isTodoEditable ? "📁" : "✏️"}
          </button>
          {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => deleteTodo(todo.id)}
          >
              ❌
          </button>
      </div>
  );
}

export default TodoItem;
