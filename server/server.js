// Import necessary modules
import express from 'express';
import 'dotenv/config'; // Loads environment variables from a .env file into process.env
import mongoose from 'mongoose';

// Set the port number
let PORT = 3000;

//email and password Regex for validation
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

// Create an instance of Express
const server = express();

//middleware for json file handling
server.use(express.json())

// Connect to MongoDB using the connection string from the environment variables
mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

//making post request 
server.post("/signup",(req,res)=>{
    
    let {fullname,email,password} = req.body;
    console.log(req.body);
    //validation data from front-end
    if(fullname.length<3){
        return res.status(403).json({"error":"fullname must be > 3"})
    }
    if(!email.length){
        return res.status(403).json({"error":"Enter Email"})
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({"error":"email is invalid"})
    }
    if(!passwordRegex.test(password)){
        return res.status(403).json({"error":"password should be 6 to 20 charachter long with number special character and capital letter"})
    }
    return res.status(200).json({"status":"OKAY"})
    
    

})

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});