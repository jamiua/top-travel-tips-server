const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const destinationRoutes = require('./routes/destinations');
const categoryRoute = require("./routes/categories");
const multer = require("multer");
// const path = require("path");

dotenv.config(); // Enables environment variables
app.use(express.json()); // Allow sending of json files

mongoose.connect(process.env.MONGO_URL)
.then(console.log("🚨 Connected to MongoDB"))
.catch(err=>console.log(err));

// Get port or use 5050
const PORT = process.env.PORT || 5050;
const welcome = `Welcome to Port ${PORT}, come get some top travel tips`;



app.get('/', (req,res)=>{
    res.send(welcome);
})

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/destinations", destinationRoutes);
app.use("/categories", categoryRoute);

app.listen(PORT, function() {
    console.log(`🚨 Server ${PORT} Started`);
});