import dotenv from "dotenv"
dotenv.config()

import express from "express"
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"

import cors from "cors"
import userRouter from "./routes/user.route.js"
import listingRouter from "./routes/listing.route.js"
import bookingRouter from "./routes/booking.route.js"
import adminRouter from "./routes/admin.route.js"

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);

let port = process.env.PORT || 6000

let app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://website-1-o11z.onrender.com",
    credentials:true
}))

app.use("/api/auth", authRouter )
app.use("/api/user", userRouter )
app.use("/api/listing",listingRouter )
app.use("/api/booking",bookingRouter )
app.use("/api/admin", adminRouter )


app.listen(port,()=>{
    connectDb()
    console.log("server started")

})
