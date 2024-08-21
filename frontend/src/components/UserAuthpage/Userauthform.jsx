import { useRef } from "react";
import Inputbox from "../singin_inputbox/Inputbox";
import googleIcon from "../../imgs/google.png"
import { Link } from "react-router-dom";
import Animationwrapper from "../PageAnimation/Animationwrapper";
import {Toaster,toast} from "react-hot-toast";
import axios from 'axios';



const Userauthform = ({type}) => {

    const authForm = useRef();

    // console.log(import.meta.env.VITE_SERVER_DOMAIN + serverRoute,formData);

    const userAuthThroughServer = (serverRoute,formData) =>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
        .then(({ data }) => {
            console.log(data);
        })
        .catch(({response})=>{
            toast.error(response.data.error)
        })
        // .catch((error) => {
        //     // Handle the case where error.response or error.response.data might be undefined
        //     if (error.response && error.response.data) {
        //         toast.error(error.response.data.error || "An error occurred");
        //     } else {
        //         toast.error("An unexpected error occurred");
        //     }
        // });
    }    
    
    //handle function to submit button

    const handleSubmit = (e) => {
        
        e.preventDefault();

        let serverRoute = type =="signin" ? "/signin" : "/signup" ;

        //email and password Regex for validation
        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
        
        
        let form = new FormData(authForm.current);
        let formData = {};
        
        for(let [key,value] of form.entries()){
            formData[key] = value;
        }

        //form validation
        let {fullname,email,password} = formData;
        //validation data from front-end

            if(fullname){
                if(fullname.length<3){
                    return console.log({"error":"fullname must be > 3"})
                }
            }
            // if (type !== "signin") {
            //     if (fullname && fullname.length < 3) {
            //         return toast.error("Fullname must be > 3 characters" );
            //     }
            // }

            if(!email.length){
                return toast.error("Enter Email")
            }
            if(!emailRegex.test(email)){
                return toast.error("email is invalid")
            }
            if(!passwordRegex.test(password)){
                return toast.error("password should be 6 to 20 charachter long with number special character and capital letter")
            }
            
            userAuthThroughServer(serverRoute,formData)
         
    }


    return (

        <Animationwrapper keyValue={type}>
        <section className="h-cover flex items-center justify-center">
            <Toaster/>
            <form ref={authForm} className="w-[88%] max-w-[400px]">
                <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                    {type == "signin" ? "Welcome Back" : "Join Us Today"}
                </h1>
                {/* condition for sigin and signup */}
                {
                    type != "signin" ? 
                    <Inputbox name="full name" type="text" placeholder="Full Name" icon="fi-rr-user"/> : ""
                }
                {/* Email box */}
                    <Inputbox name="email" type="email" placeholder="Email" icon="fi-sr-envelope" /> 
                {/* password box */}
                    <Inputbox name="password" type="password" placeholder="Password" icon="fi-sr-key" />

                {/* signin signup button */}

                <button className="btn-dark center mt-14" type="submit" onClick={handleSubmit}>
                    {type}
                </button>

                {/* continue wiht googel button */}
                
                <div className="relative w-full flex items-center gap-2 my-10 uppercase text-black font-bold">
                <hr className="w-1/2 border-black"/>
                <p>or</p>
                <hr className="w-1/2 border-black" />
                </div>

                {/* google Buttom */}
                <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
                <img src={googleIcon} className="w-5"/>
                    Continue With Google
                </button>

                {/* condition when to show or not  */}
                {
                type =="signin" ?
                <p className="mt-6 text-dark-grey text-xl text-center">
                Dont have an account ?
                <Link to="/signup" className="underline text-black text-xl ml-1">
                Join Us Today
                </Link>
                </p>
                :
                <p className="mt-6 text-dark-grey text-xl text-center">
                Already a Member ? 
                <Link to="/signin" className="underline text-black text-xl ml-1">
                Login Now
                </Link>
                </p>
                }



            </form>
        </section> 
        </Animationwrapper>
    );
};

export default Userauthform;

