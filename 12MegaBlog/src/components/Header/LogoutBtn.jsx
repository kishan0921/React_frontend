import React from 'react';
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../appwrite/authSlice'


function LogoutBtn() {
    // Chalo 1 dispatch bana lete hai, kyuki dispatch kuch na kuch krna hi hoga
    const dispatch = useDispatch()

    const logoutHandler = () => {
    // authService se direct maine ek method banaya hai, logout wo le lenge
    // Now jaise hi logout() call kiya na, ab mujhe milega promise
        authService.logout()
    // ab promise ko handle krne ke liye 
    .then (()=>{
        // agar logout ho gya hai to , to ab dispatch bhi kr dete h
        // taaki store ke ander ko update infromation h wo send ho jaaye
        dispatch(logout())
        })
    }

    return (
        <button className= 'inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >
            logout </button>
    )
}

export default LogoutBtn













