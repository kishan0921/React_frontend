// Create a authentication layout (So interesting layout) - 6:27:00
// Note: Ye ek mechanishm hai ki kis tarah se pages , and route ko protect kiya jaata hai.
// Basically, ye ek projected container h

// Ab hum authentication layout ke baare me baat krenge.
//And ye bahut jagah use hoga, 
// Note: Ye basically, mechanishm hai ki kaise pages and routes ko protect kiya jaata hai.


// Basically, hum ek protect krne waala container banaana chahte h


import React, {useEffect, useState} from 'react'
//Humme , selector bhi chahiye kyuki, kcuh chize puchni padegi apne store se
import {useSelector} from 'react-redux'
// User ko naviagte bhi kar paau , issliye useNavigate import krenge
import {useNavigate} from 'react-router-dom'


// Yaha hym function bana bhi rahe hai, and export bhi kr de rahe hai.
// props me hum , children and authentication pass kr skte h
export default function Protected({children, authentication = true}) {

    // navigate bhi le lete hai
    const navigate = useNavigate()
    // ek loader bhi le lete hai, and byfeault true hoga
    const [loader, setLoader] = useState(true)
    // ab mujhe puchna hoga auth status se ki aap login ho ya nahi
    // and authstatus kaha se aayega ? - useSelector se aayega
    const authStatus = useSelector(state => state.auth.status)


    // ab mai useEffect ka use krunga, and useEffect hi baatayega
    // ki mujhe kaha bhejna hai user ko , like /login pe bhejna hai ya / pe bhejna hai
    // Syntax : useEffect (() => {}, [])
    
    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        // auth value agar true hai, to true nhi to false daal do.
        //let authValue = authStatus === true ? true : false

        // Suppose user ne authentication bhejna true , then mai user ki baat nahi maanunga
        // and authStatus bhi check krunga not equal to authentication se , jisski value store se aa rahi h
        // inshort - true && false != true
        // final result uppar waale ka -  true && true
        if(authentication && authStatus !== authentication){
            // then user ko navigate kr do login page pe
            navigate("/login")
        } 
        // inshort - false && true !== true
        // final result uppar waale ka - false && false
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        // loader false kr diya, means loader show nhi krega
        // uppar condition chahe run ho ya nahi setLoader aapka last me 
        // false hi ho jaayega.
        setLoader(false)
    }, 
    // ek to mai dependent hu = authstatus pe, then naviagte pe , and authentication pe
    // authstatus me kuch bhi change hota hai, to iss useEffect ko dubara run kr dena.
    // navigate pe bhi dependent hai.
    // and user ne agar authentication wagera kuch bhi bheja hai to usse basis pe bhi useEffect run kr lena.
    [authStatus, navigate, authentication])

    // agar loader true hai to loading show krega, and children show nhi krega
    // agar false hai to children show krega
  return loader ? <h1>Loading...</h1> : <>{children}</>
}

