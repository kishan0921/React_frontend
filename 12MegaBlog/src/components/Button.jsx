import React from 'react'

// button jo hai, wo children as parameter leega
function Button({
    // ye sab parameter hai button ka 
    // and default value assigned kr rahe , infuture agar kahi value assigned nhi hua 
    // to default use ho jaayega.
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',   // classname empty hi lete h 
    ...props   // aur props le lete h, aur kuch bhi agar aapne pass kiya h then wo aa jaayega
    // props le liya hu and spread kr diya hu.
}) {
    return (
        //yaha classname me kuch new properties hai jaise - px-4,py-2 etc
        // and then mujhe kuch properties uss krne hai, jo ki pehle se likhe hue h
        // to ussko ek string me lena hai so - ${``}
        // and then same {...props } - props pass kr diya and spread kr diya hu
        <button className={`px-4 py-2 rounded-lg ${bgColor} 
        ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button