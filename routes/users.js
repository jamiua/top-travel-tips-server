const router = require("express").Router();
const User = require("../models/User");
const Destination = require("../models/Destination");
const bcrypt = require("bcrypt");


// Update existing user profile
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
      res.status(401).json("You are not authorized to access this account!");
    }
});

// Delete existing user profile
router.delete("/:id", async (req, res) => {

    // Compare credentials entered to called credential to authenticate
    if (req.body.userId === req.params.id) {

        // Set current user to received parameter
        try {
            const user = await User.findById(req.params.id);
            try {
                // Delete all destination posts associated with this user
                await Destination.deleteMany({ username: user.username });
                // Delete this users credentials from database
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User profile has been deleted...");
            } 
            catch (err) {
                res.status(500).json(err);
            }
        } 
        catch (err) {
            res.status(404).json("User profile not found!");
        }
    }
    else {
      res.status(401).json("You are not authorized to delete this account!");
    }
});

// Get existing user profile
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        // Fetch all other information but user password
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } 
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;