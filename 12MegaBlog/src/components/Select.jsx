// Note:  forwardRef ka use krenge- 2 Tarike se 
// 1st - this file input.jsx
// 2nd = select.jsx (export me "React.forwardRef" ye use kr liye h)

// same jaise input.jsx me use kiya tha id - for unique id import kr liye.
import React, {useId} from 'react'

function Select({
    // ye saare properties as object hai.
    // ab properties le lete hai
    options,
    label,
    className = '',  // aisa mtlb className ='' empty hi hua
    // ab saare apne properties ko spread kr lete h
    ...props
}, 
// saath me mujhe ref bhi return krna hoga
ref) {

    // use Id banate hai.
    const id = useId()
  return (
    // chalo ab form baane ki kosis krte hai.
    <div className='w-full'>
        {/* // now agar label kuch hai then && ke baad jo bhi likha h wo display krwa denge. */}
        {label && <label 
        // html for me id pass krne se unique id milegi hume
        htmlFor={id} 
        // classNma empty hi hua
        className=''></label>}

        {/* // ab hume chahiye 1 select element  */}
        <select
        // ab ky select ke ander kuch properties deni hai.
        // hann , jitne bhi properties uppar hai sab pass kr do.
        // kar diya saare properties ko as- {...props}
        // note: {...props} - last me pass kro, pehle pass kro koi farak nhi pdta
        {...props}
        // id de do, jo uppar generate hua hai.
        id={id}
        // ab ref jo apne user se liya h, as a props ussko pass kr do
        // note: yahi wo chiz hai, jo aapko ref degi parent component ke ander, issliye humne apna forwardRef use kiya hu.
        ref={ref}
        // ab thodi className bhi add kr dete h, and default value bhi de dete hai
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
        {/* // ab kyuki select use kiya hu, to options bhi dene padenge */}

        {/* // ab option ke ander ?. ternary operator use kiya hu. */}
        {/* // like options hai then, then map ka use kro and loop chalo  */}
            {options?.map((option) => (
                // key option pass kiya hu, and value option pass kiya hu
                <option key={option} value={option}>
                    {/* // option ke ander option pass kr diya hu. */}
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)