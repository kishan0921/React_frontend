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
    // callback me hum previous value le lenge, then {} ye use ni krenge, kyuki mujhe kuch return ni krna h
    // to () ye use krenge, then prev value pe ek loop laaga diya (map laaga denge),
    //Map loop ke ander, hum har ek todo le rahe h (prevTodo) then 
    // (prevTodo) - har ek individual todo h 
    // then isspe callback laaga dete h,then, har ek jo prevTodo mil raha h usske saath id hai 
    // prevTodo.id - ye old waala todo ka id match kr rahe h new todo waala id se  === id 
    // then ? mtlb agar true hai, mtlb id mil gayi h to new todo daal do
    // : else flase me prevTodo, mtlb id ni mili h to old Todo daal do.(woohi purana waala no change - prevTodo)
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
  }

  // ab delete functionality dekh lete h.
  // deleteTodo ke liye mujhe bas id chahiye 
  const deleteTodo = (id) => {
    // isske baad hum setTodos ko call kr denge
    // setTodos ke ander mujhe prev value ka access de do,
    // then prev pe filter method ka use kr lenge.
    // filter ke ander hum saari todo bhej denge, then bolenge ki aap saari value aane do todo ki
    // bas ek value mt laagao jo ki, todo.id jo hai wo match ni krni chahiye humari id se.
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  // ab toggleComplete ka krte h, isske liye mujhe bas id chahiye
  const toggleComplete = (id) => {
    // then isske ander hum setTodos call kr denge.
    //console.log(id);

    // setTodos me saari prev state/value ka access chahiye
    setTodos((prev) => 
      // saari prev value pe ek loop laga denge called map
    //map laagane par, har ek map ke ander value ka access mil jaayega.
    // (prevTodo) => ? "true": "false"  loop laaga rahe h
    prev.map((prevTodo) => 
      // mujhe yaha check krna hoga, ki jo prevTodo hai wo wohi waali id jo aapne pass ki h,
    // agar id match hoti h then, baaki saari value as it is rakho ...prevTodo, bass ek value change kr do
    //...prevTodo saari value aa gyi yhen , laga kr completed lo then issko override kr denge
    // prevTodo.completed value le rahe h, then ! use krke aagar true/false hoga to false/true kr denge
      prevTodo.id === id ? { ...prevTodo,
        // agar id match ni hoti h, to kuch mt kro prevTodo ko prevTodo hi rahne do. 
        completed: !prevTodo.completed } : prevTodo))
  }


  // note: Ab hum localStorage dekhenge.
  // localStorage ko JSON me value chahiye , so hume convert krna hoga string value ko, so JSON use krna hoga.

  // first time page hone pe useEffect call hoga. only and dependency array ni h t fir run ni hoga.
  useEffect(() => {
    // firstly, saaari value le kar aani h
    // get krte time mujhe sirf key ki value batani padti h.
    // to hum localStorage ka use krenge then getItem method use krenge, then key bata dnege 
    // then mujhe JSON me chahiye value chahiye, so JSON.parse se convert kr denge string value ko.
    const todos = JSON.parse(localStorage.getItem("todos"))

    // ab hume bas value set krni h agar uss todos me kuch mile tb hi.
    // to check kr lete h,
    //ki todos hai ya ni and also todos to h, but value 0 se zaada hona chahiye
    if (todos && todos.length > 0) {
      // sab kuch thik h then, setTodos ko call kr denge, then todos saare de denge setTodos ko.
      setTodos(todos)
    }
  }, 
  // koi dependency array ni h
  [])



  useEffect(() => {
    // wohi localStorage lete h then setItem method use krenge, then key aur value batana hoga
    // key meri hai "todos"
    // and value mujhe string me hi dena padta hai , so Json value ko convert kr denge string me using JSON.stringify
    // then todos daal do, bss kthm kaam.
    localStorage.setItem("todos", JSON.stringify(todos))
  },
  // dependency array me mera todos h
  [todos])
  



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
                        {/* saare apne todo le liya mai , then usspe loop laaga diya 
                       map waala then map ke ander mere pass saare todo ka access hai.
                       mtlb saare todo pe 1-1 krke jaayega. */}
                        {todos.map((todo) => (
                          // ab ek div call kr liya, ab har ek todo waali div unique h ussko 
                          // baatane ke liye hum key de denge like {todo.id}
                          <div key={todo.id}
                          className='w-full'
                          >
                            {/* ab yaha pe humne apna TodoItem component call kr liya */}
                            {/* sirf call krne se ni hoga issko ek props/property bhi pass krni hogi todo={todo} */}
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

