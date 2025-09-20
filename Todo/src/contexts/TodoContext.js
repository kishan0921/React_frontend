// Note: context me mujhe return warega kuch nhi mil raha hai, issliye maine isska name 
// .js file rakha hai.

// App agar aapko wo provider. waala drama ni krna hai,
// to mujhe 2 chize need hogi yaha pe, createContext and useContext issko import kr lete h
// and ye sab react se aayega.
import {createContext, useContext} from "react"


// ab mujhe ek context ko export krna hai.
//next ab TodoContext kaise banega ?  createContext se
// Ab createContext ky hai ?
// createContext mera ek object hai 
export const TodoContext = createContext({
    // Rules : 
    // 01 - property define kr do context ka (Example - theme : dark waise hi)
    // 02 - functionlity/Methods define ki jaati hai context ki. and empty rahti h....main file me hum define krte hai.

// Ab jab aap context bana rahe ho to context ki kuch default value hogi.

// Basically, todos ke jo functionlity h like add krna todo,
// update krna , delete krna , toggle krna ye sab rahega issme.


// ------------------- Start ------------------
// sabse pehle maine banaya , ek todos name se ek array
// Note: ye mera Todo ka property ho gya.
// 01- Chalo property define krte hai. (Example - theme : dark waise hi)
    todos: [
        // iss array ke ander har ek field jo hogi , wo {} aise add hoti jaayegi.
        // Basically , har ek new add todo aise object ke form me add hota jaayega. 
        //jab bhi hum koi new todo add krega to iss array me add ho jaayega.

    // Note: har ek mera todo ek object hoga.
        {
            // Har ek todo ke pass id hogi
            id: 1,
            // todo/title message hoga.
            todo: " Todo msg",
            // and by default completed ki value false.
            completed: false,
        }
        // same way aise hi mere todos add hote jaayenge.

    ],

    // 02 functionlity/methods define krenge and wo empty rahega.

    // first funcitonality add krenge - addTodo
    // ab addTodo kaise functionality h?  
    // kuch ni aap mujhe ek todo (mtlb ek message  [todo: " Todo msg",] pass kroge,then =>{} ek function kuch kaam krega)
    // kon kaam krega and kaise ? ye sab hum main file me decide krenge.
    addTodo: (todo) => {},

    // ab hum todo ko update bhi krenge.
    // jab update krenge, to aap mujhe ek message [todo: " Todo msg"] to doge hi, saath me id bhi doge, like kon se waali, ,then =>{} ek function kuch kaam krega
     // kon kaam krega and kaise ? ye sab hum main file me decide krenge.
    updateTodo: (id, todo) => {},

    // ab todo delete bhi to kroge, kon si krni hai, usski id de do, ,then =>{} ek function kuch kaam krega
     // kon kaam krega and kaise ? ye sab hum main file me decide krenge.
    deleteTodo: (id) => {},

    // toggle comple, jab hum todo ko tick kr dete hai wo wala
    // jab hum toggleComplete functionality use krenge, to bs ek field update hogi
    // baaki kaam css kregi, toggleComplete kon si krni hai, usski id de do,then =>{} ek function kuch kaam krega
     // kon kaam krega and kaise ? ye sab hum main file me decide krenge.
    toggleComplete: (id) => {}

    // Note: mera component kon sa bhi ho, value to yahi se lunga. ye kahani ho gyi
})


// then uppar ko mera TodoContext bana h, ussko export kr dete hai.
// Note: hume baar baar wo import krke use ni krna hai har ek file me..
// so hum direct ek hook hi export kr dete hai.called useTodo and isske ander hum 
// useContext waala context rakha hai.

// Now, hum export kr diya apna new hook useTodo
// useTodo bas ek method hai.
export const useTodo = () => {
    // isske ander kaise krenge, return krna hoga 
    // to kya return krna hoga? - useContext kon sa ?
    // apna bana hua context - TodoContext 

    // Note: Jab bhi useContext kroge usse ek context dena hoga.
    // like kis context ke baare me baat kr rahe h ... to yaha hum TodoContext ki baat kr rahe h
    return useContext(TodoContext)
}

// Ab ek provider bhi export kr dete h.
// kuch ni ek variable hi export hota h, aur kuch ni 
// hum iss variable ka name de dete hai TodoProvider
//Note: taaki mujhe har jagah TodoContext.provider ni likha pade...bass issliye ye banaya h maine
export const TodoProvider = TodoContext.Provider
