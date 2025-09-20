import './App.css'

import { useState, useEffect } from 'react'
// todo provider le rahe hai, context se.
import {TodoProvider} from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

  // Important point : jo mera todos hai, jo context se aa raha hai (TodoContext.js file)
  // ussko kahi na kahi store rakhoge.
  // to ye to kehni ki baat hi nhi hai , state me hi store rakhenge.
  // to ye raha mera todos and setTodos and kaha se aayega ye ? useState se
  // and by default useState ka value [] empty array rahega.
  const [todos, setTodos] = useState([])


  // Ab ek ek karke , context me jo functionality/method define kiya hu wo dekhte hai.

  // 1st addTodo -  
  // Rules : 01 jo name context me rakha hai waise hi rahna chahiye
  // syntax - const addTodo = () => {} method ready hai.
  // ab isske ander hum form waala todo message denge, then
  // 
  const addTodo = (todo) => {
    // ab hum setTodos ko call krengee,
    // setTodos((todo) aise har kiya to , purani saari value delete ho jaayegi and 1 new value add hogi- wronge way
    //(prev) se mujhe purana array mil jaayega,ab old array mil gya then old array ka use krke new array bana do 
    // => [{}] new array and issme old value bhi daal do and new value bhi bas.
    // ...prev - purani saari value li and ussko spread kr diya hu.
    setTodos((prev) => [
       // ab new value hai ussko kaha rakhna h?
       // ek {} object banao, then isske ander id do, ab mujhe id ky dena h pta ni 
       // so Date.now use kr lo, unique value create ho jaayegi.
       // then , baaki jitni value h ussko le lete hai, ...todo aise.
      {id: Date.now(), ...todo}, ...prev] )
  }

  // ab next hum apna updateTodo Karenge.
  // hum updateTodo call Karenge, then issko id and todo chahiye hoga.
  const updateTodo = (id, todo) => {
    // ab wohi apna set todo call krte h, and mujhe pta h isske ander ek  () => {} callback h.
    // callback me hum old value le liye, then old/prev value pe map laga dete 
    //mujhe pta h, map laagane se mujhe har ek Todos mil jaayega.
    // note: har ek todo mere object h, and har object ke ander id h
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))

    
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  



  return (
    // TodoProvider start here 
    // context waali functionality acche se work kre usske liye , mujhe TodoProvider me sabkuch wrap krna hoga.
    // abb mujhe TodoProvider ke ander baatana bhi hoga , ky provide krna hai.
    // to value use krenge and ek tarike se destructure kr raha TodoProvider from context including , 1.properties and 2.functionality/methods
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
      {/* TodoProvider wrap end here  */}
    </TodoProvider>
  )
}

export default App

