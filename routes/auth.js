const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register a new user profile
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPass,
    });
  
    // Save new user to mongoDB atlas server
    const user = await newUser.save();
    res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
  // Login an existing user profile
  router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      !user && res.status(400).json("Username or password is incorrect!");
  
      const validated = await bcrypt.compare(req.body.password, user.password);
      !validated && res.status(400).json("Username or password is incorrect!");
  
      // Return all other information but password as user info
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Export the router for use in index.js
  module.exports = router;
