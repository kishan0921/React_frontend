// state to change krna hoga , so useState le lete hai
import React, {useState} from 'react'
// login ke baad kahi to bhejoge user ko , 
// Clickable ke liye Link, and Dusri jagah bhejne ke liye useNavigate import krenge kr liye
import {Link, useNavigate} from 'react-router-dom'
// ab login import kr rahe hai and , yaaha hm usse as authLogin use krengege.
import { login as authLogin } from '../store/authSlice'
// Button, input, Logo sab index se import kr liye h
import {Button, Input, Logo} from "./index"
// Dispatch bhi krna hoga , to useDispatch import krenge react-redux se
import {useDispatch} from "react-redux"
// authService bhi lagegi hi , to import krenge
import authService from "../appwrite/auth"
// and form ke liye react-hook-form import krenge
import {useForm} from "react-hook-form"

function Login() {

    // sabse pehle navigate to lenge hi 
    const navigate = useNavigate()
    // dispatch bhi le aate hai.
    const dispatch = useDispatch()

    // useForm bhi to laaye ho, to as it is from documentation se le aate h
    // useForm se hum, register and handleSubmit le rahe hai.
    const {register, handleSubmit} = useForm()
    // error display krwane ke liye useState ka use krenge
    // starting me empty state hai isska
    const [error, setError] = useState("")


    // Ab sabse pehle to 1 method banayenge login ka
    // then async function banayenge , kyuki data submit hoga then aayega , and bahut kuch
    const login = async(data) => {
        // Now, jab bhi login first time set kro to error ko empty kr do.
        setError("")

        // ab try ke ander hum saara data send krke dekhenge.
        // jo bhi form me fill hoga.
        try {
            // async laaga rakha hai, to await use krna hi hoga.
            // then authService se login method ko call krenge and data ko send krenge
            // and jo response aayega wo aayega ek session.
            const session = await authService.login(data)
            // agar session aaya hai then
            if (session) {
                
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            // agar error aaya to error message show kr denge.
            // ye jo error.message hai ye mai state me save kr liya hu.
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login