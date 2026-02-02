import React from "react";

// STEP 01: Humme ek button banaana hai.
// Now ab sabse interesting chiz jo hoti hai, wo hai button hum kya-kya parameter accept kr rahe hai and ussko use krne ka tarika.
function Button({
  // STEP 02:
  // button jo hai usske ander, aksar(mostly) jo parameter lete hai,wo hota hai  "children" as parameter hum lete hai.
  // ye sab parameter hai button ka
  // and default value assigned kr rahe , infuture agar kahi value assigned nhi hua
  // to default use ho jaayega.
  children,

  // Step : 04
  // and by default hum isska type bhi define kr dete hai.
  // Note: ye sab hai default value, agar koi define krega then hum wo use kr lenge warna.....ya default value used ho jaayega
  type = "button",
  // then bg color, textColor and classname also
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "", // classname empty hi lete h (Mostly)
  // Then usske baad hum aise krte hai ...props (props ko spread kr diye hai)
  ...props // aur props le lete h, aur kuch bhi agar aapne pass kiya h then wo aa jaayega
  // props le liya hu and spread kr diya hu.
}) {
  return (
    // STEP : 05
    //yaha classname me kuch new properties hai jaise - px-4,py-2 etc
    // and then mujhe kuch properties uss krne hai, jo ki pehle se likhe hue h
    // to ussko ek string me lena hai so - ${``}
    // and then same {...props } - props pass kr diya and spread kr diya hu
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} 
        ${textColor} ${className}`}
      {...props}
    >
      {/* STEP : 03 Then yaha hum aise "children" waale parameter ko le lete hai  */}
      {children}
    </button>
  );

  // STEP : 06
  // Note: Same Syntax hum ek aur jo button hoga merea input waala , ussme bhi same code use krenge...Only difference hoga ki wooha ek new hook hum use krenge.
}

export default Button;
