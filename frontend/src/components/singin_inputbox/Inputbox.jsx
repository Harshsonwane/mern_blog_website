import { useState } from "react";

const Inputbox = ({name,type,id,value,placeholder,icon}) => {
    
    const[passwordVisible,setpasswordVisible] = useState(false);
    
    return(
        <>
        {/* <h1>INput box hain ha ji </h1> */}
        <div className="relative w-[100%] mb-4">
           {/* input i should be small  */}
            <input 
                name={name}
                type={ type == "password" ? passwordVisible ? "text" : "password" : type}
                placeholder={placeholder}
                defaultValue={value}
                id={id}
                className="input-box"
            />
            {/* //custom prop for icon  */}
            <i className={"fi " + icon + " input-icon"}></i>
            
            {/* //password eye */}
            {
                type=="password" ? 
                <i className={"fi fi-rr-eye" + (!passwordVisible ? "-crossed" : "") + " input-icon left-[auto] right-4 cursor-pointer"}
                onClick={()=>setpasswordVisible(currentVal => !currentVal)}
                ></i>
                : ""
            }


        </div>
        </>
    )
}

export default Inputbox; 