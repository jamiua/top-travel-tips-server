const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const destinationRoute = require('./routes/destinations');
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

dotenv.config(); // Enables environment variables
app.use(express.json()); // Allow sending of json files
app.use("/images", express.static(path.join(__dirname, "/images"))); // Enabling image path for file upload from client

const PORT = process.env.PORT || 5050; // Get port from .env or use 5050
const welcome = `Welcome to Port ${PORT}, come get some top travel tips`;

app.get('/', (req,res)=>{
    res.send(welcome);
})

mongoose.connect(process.env.MONGO_URL)
.then(console.log("🚨 Connected to MongoDB"))
.catch(err=>console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images"); // Callback to handle error and server destination folder
    },
    filename: (req, file, cb) => {
      cb(null, req.body.imgname); // Callack to handle error and client upload filename
    },
});

const upload = multer({ storage: storage });
// Upload one file at a time using /upload url
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Your image file was successfully uploaded");
});

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/destinations", destinationRoute);
app.use("/categories", categoryRoute);

app.listen(PORT, function() {
    console.log(`🚨 Server ${PORT} Started`);
});