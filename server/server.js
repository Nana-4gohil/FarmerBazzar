import express from 'express'
import dotenv from 'dotenv'
import authRoute  from './routes/authRoute.js'
import predictRoute from './routes/predictRoute.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth';

import productRoute from './routes/productRoute.js'
import notificationRoute from './routes/notificationRoute.js'
import fileUpload from 'express-fileupload';
import { v2 as cloudinary} from 'cloudinary'

const app = express()

dotenv.config()
const port = process.env.PORT ||  '3000'

cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    

app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/'
  }));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())

const firebaseconfig = {
      apiKey: "AIzaSyDpb2LZG4K9SwBtLcjPgUIVMgu9T-9Q3Ss",
      authDomain: "farmer-bazzar.firebaseapp.com",
      projectId: "farmer-bazzar",
      storageBucket: "farmer-bazzar.firebasestorage.app",
      messagingSenderId: "947822862899",
      appId: "1:947822862899:web:e3cbc377c4a604d0313946",
      measurementId: "G-K189DEZCWV"
};

app.use("/api/v1/auth/",authRoute)
app.use("/api/v1/product/",productRoute)
app.use("/api/v1/crop/",predictRoute)
app.use("/api/v1/notification/",notificationRoute)
const firebaseApp = firebase.initializeApp(firebaseconfig, 'ClientApp');

export const auth = getAuth(firebaseApp);
app.listen(port,()=>{
      console.log(`App is listening at port http://localhost:${port}`)
})