import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async ()=>{
        try{
              const DB_OPTIONS = {
                    dbName : "Farmer_Bazzar"
              }
              const conn = await mongoose.connect(process.env.DATABASE_URL,DB_OPTIONS)
              console.log("Connect to MongoDb succesfully")
        }catch(err){
              console.log(`${err.message}`)
        }
}

export default connectDB