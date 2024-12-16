import express from 'express'
import dotenv from 'dotenv'
import authRoute  from './routes/authRoute.js'
import connectDB from './db/connectMongoDB.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express()
dotenv.config()

const port = process.env.PORT | '3000'
app.use(express.json());
app.use(cookieParser());
app.use(cors())

app.use("/api/v1/auth/",authRoute)


app.listen(port,()=>{
      console.log(`App is listening at port http://localhost:${port}`)
})