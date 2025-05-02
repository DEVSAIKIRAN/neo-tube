import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/monogodb'

//App Config 
const PORT = process.env.PORT || 4000
 const app = express()
await connectDB()
 // Middleware
 app.use(express.json())
app.use(cors())

 //API ROUTES
 app.get('/',(req,res)=> res.send("API IS WORKING"))

 app.listen(PORT,()=> console.log("Server is running on port",PORT))