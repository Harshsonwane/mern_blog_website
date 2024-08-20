import Inputbox from "../singin_inputbox/Inputbox";

const Userauthform = ({type}) => {
    return (
        <section className="h-cover flex items-center justify-center">
            <form className="w-[88%] max-w-[400px]">
                <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                    {type === "signin" ? "Welcome Back" : "Join Us Today"}
                </h1>
                {
                    type !== "signin" ? 
                    <Inputbox name="full name" type="text" placeholder="full name" /> : ""
                    
                }
            </form>
        </section>
    );
};

export default Userauthform;
