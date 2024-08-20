// Import necessary modules
import express from 'express';
import 'dotenv/config'; // Loads environment variables from a .env file into process.env
import mongoose from 'mongoose';
import bcrypt  from 'bcrypt';
import { nanoid } from 'nanoid';

import User from './Schema/User.js';   //user mongo schema

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

//unique username generating to avoid error
const generateUsername = async (email)=>{
    let username = email.split("@")[0];
    let isUsernameNotUnique = await User.exists({"personal_info.username":username}).then((result)=>result);
    isUsernameNotUnique ? username += nanoid().substring(0,5) : "";
    return username;
}


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

     bcrypt.hash(password,10, async (err,hashed_password)=>{
        
        let username = await generateUsername(email);

        //in database User from schema
        let user = new User({
            personal_info:{fullname,email,password:hashed_password,username}
        }) 

        user.save().then((u)=>{
            return res.status(200).json({user:u})
        })
        .catch(err=>{
            if(err.code==11000){
                return res.status(500).json({"error":"Email already exits"})
            }
            return res.status(500).json({"error":err.message})
        })
     })
    // return res.status(200).json({"status":"OKAY"})
    
})

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});