import mongoose from "mongoose";
const connectDB=async(DATABASE_URL)=>{
    try{
        await mongoose.connect(DATABASE_URL);
        console.log("database connected")
    }catch(error){
        console.log("error while connecting to database", error)
        process.exit(1); // Stop the application if the database connection fails

    }    
}

export default connectDB;