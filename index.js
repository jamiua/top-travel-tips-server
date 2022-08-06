const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
// const destinationRoutes = require('./routes/destinations');
// const categoryRoute = require("./routes/categories");
// const multer = require("multer");
// const path = require("path");

const cors = require('cors');

// Enables environment variables
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(console.log("🚨 Connected to MongoDB"))
.catch(err=>console.log(err));

// Get port or use 5050
const PORT = process.env.PORT || 5050;
const welcome = `Welcome to Port ${PORT}, come get some top travel tips`;

// Allow sending of json files
app.use(express.json());


app.use(express.static('./public'));
app.use(cors());

app.get('/', (req,res)=>{

    res.send(welcome);
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
// app.use("/api/destinations", destinationRoutes);
// app.use("/api/categories", categoryRoute);

app.listen(PORT, function() {
    console.log(`🚨 Server ${PORT} Started`);
});