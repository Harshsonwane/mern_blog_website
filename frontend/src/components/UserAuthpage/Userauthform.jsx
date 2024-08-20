import Inputbox from "../singin_inputbox/Inputbox";
import googleIcon from "../../imgs/google.png"
import { Link } from "react-router-dom";
// import Animationwrapper from "../PageAnimation/Animationwrapper";

const Userauthform = ({type}) => {
    return (

        
        <section className="h-cover flex items-center justify-center">
            <form className="w-[88%] max-w-[400px]">
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
                <button className="btn-dark center mt-14" type="submit">
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
        
    );
};

export default Userauthform;

