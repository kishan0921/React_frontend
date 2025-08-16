// Issme hum ek new chiz use krenge, Id to wo le liye hai react se
import React, {useId} from 'react'

// Ekdm same hum button.jsx jaisa hi likhne waale h,but yaha 
// new concept forwardRef ka use krenge.
// funct input bhi use kr skte hai, 
// but, thoda aache se structure way me rahe, issliye arrow function ka use kr lenge.
// Jo bhi property pass krenge, wo likhne se pehle mai 
// saara kuch React.forwardRef, isse ander likhunga.
// then forwardRef () - wrappup kr diya hu
// then ab forwardRef () ke ander - function define krunga.
// function then function ka input() 
// and {} ye raha isska defination.

const Input = React.forwardRef( function Input({
    // ye raha function ka input overall
    // input ke ander sabse pehle label liye h
    label,
    // then type liya hu
    type = "text",
    // the as usual , className = "" empty jaisa, button.jsx me bhi liya tha
    className = "",
    // Props - properties bhi pass kr diya hai, (like aur bhi property bologe to add kr denge)
    // then props pass kr diya hu and spread kr diya hu
    ...props
},// and uppar ye jo input hai jo bhi use krenga wo ek "ref" bhi pass krega. 
ref){
    // and yaaha se start hota hai, function ka definition.

    // Use id kaise use krte hai ? bhool gaye 
    // ye raha aise use krte h
    const id = useId()


    return (
        // ab yaaha pe mere pass ek div hai and usska name w-full hai.
        <div className='w-full'>
            // Now, agar label pass kiya hai then only && ke baad jo likha hai show kro nahi to nahi.
            // same use kiya hu button.jsx file me
            {label && <label 
            className='inline-block mb-1 pl-1' 

            // ab hume useId import kiya hu , for generating unique id
            // so using htmlFor  and isske ander {id} pass krne se unique id milegi hume
            htmlFor={id}>
                {label}
            </label>
            }

            // Now ab chahiye input
            <input
            // ab type user ne diya h to thik nhi to default use kr lenge.
            type={type}
        // yaha humne class name me px-3 ,py-2 etc pass kiya hu and laste me agar koi default value hoga to wo bhi inclue kr liya hu. ${className}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            // ab ref jo apne user se liya h, as a props ussko pass kr do
            // note: yahi wo chiz hai, jo aapko ref degi parent component ke ander, issliye humne apna forwardRef use kiya hu.
            ref={ref}
            // aur kuch bhi pass hua hai to yaha likh lo
            {...props}
            // ab yaha id pass kr lete hai.
            id={id}
            />
        </div>
    )
})

export default Input