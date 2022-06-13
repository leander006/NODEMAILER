const express = require("express")
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv');
// const nodemailer = require("nodemailer")
const authRoute = require("./routes/auth")
const userRoutes = require("./routes/user")

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(console.log("Connected to mongodb")).catch((err)=>{console.log("invalid",err)})



app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",userRoutes);

app.listen(process.env.PORT || 8080,()=>{
      console.log("backend runnig on port 8080");
})