import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimit from 'express-rate-limit'
import hpp from 'hpp'

import cors from 'cors'
import auth from './routes/auth.js'
import products from './routes/products.js'

const app = express();
dotenv.config()

mongoose.connect(
    process.env.MONGO_URL
)
.then(() =>console.log("DBConnection Successfull"))
.catch((err) =>{
    console.log(err)
})

app.use(cookieParser())

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attacks
app.use(xss());

//Enable CORS
app.use(cors());

//Rate Limiting
const limiter=rateLimit({
    windowsMs:10*60*1000,//10 mins
    max:100
});
app.use(limiter);

//Prevent http param pollutions
app.use(hpp());

app.use(express.json())

app.use("/api/auth", auth)
app.use("/api/products", products)

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is running!")
})