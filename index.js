const express = require("express");
const app = express();
const destinationRoutes = require('./routes/destinations');
const cors = require('cors');
const mongoose = require('mongoose');

// Enables environment variables
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL)
.then(console.log("Connected to MongoDB"))
.catch(err=>console.log(err));

// Get port or use 5050
const PORT = process.env.PORT || 5050;
const welcome = `Welcome to Port ${PORT}, come get some top travel tips`;

app.use(express.json());
app.use(express.static('./public'));
app.use(cors());

app.get('/', (req,res)=>{

    res.send(welcome);
 })

app.use('/destinations', destinationRoutes);

app.listen(PORT, function() {
    console.log(` 🚨 Server ${PORT} Started`);
});