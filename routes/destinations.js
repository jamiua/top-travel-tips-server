const router = require("express").Router();
const User = require("../models/User");
const Destination = require("../models/Destination");

// Create new destination
router.post("/", async (req, res) => {

    // Catch all information sent from form in body
    const newDestination = new Destination(req.body);
    try {
        const savedDestination = await newDestination.save();
        res.status(200).json(savedDestination);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update destination info
router.put("/:id", async (req, res) => {
    try {
        // Find queried destination post
        const destination = await Destination.findById(req.params.id);

        // Compare current destination username with submitted username
        if (destination.username === req.body.username) {
            try {
                const updatedDestination = await Destination.findByIdAndUpdate(
                req.params.id,
                {
                $set: req.body,
                },
                // Show updated destination info
                { new: true }
            );
            res.status(200).json(updatedDestination);
            } catch (err) {
            res.status(500).json(err);
            }
        } else {
            res.status(401).json("You are not authorized to update this post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete destination info
router.delete("/:id", async (req, res) => {
    try {

        // Set current destination info to queried destination by Id
        const destination = await Destination.findById(req.params.id);

        // Compare current destination info username to received username
        if (destination.username === req.body.username) {
            try {
                // Delete this users destination from database
                await destination.delete();
                res.status(200).json("Destination details have been deleted...");
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(401).json("You can delete only your post!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single destination info
router.get("/:id", async (req, res) => {
    try {
        const singleDestination = await Destination.findById(req.params.id);
        res.status(200).json(singleDestination);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all destination info
router.get("/", async (req, res) => {
    const username = req.query.user;
    const categoryName = req.query.cat;
    try {

        // Destination info can change
        let allDestinations;
        if (username) {

            // Find all destinations associated with logged in user
            allDestinations = await Destination.find({ username: username });

            // Find if a specific category name is provided within the destination info and assign to given destinations
        } else if (categoryName) {
            allDestinations = await Destination.find({
            categories: {
                $in: [categoryName],
            },
        });
        } else {
            // Otherwise get all destinations
            allDestinations = await Destination.find();
        }
        res.status(200).json(allDestinations);
    } catch (err) {
        res.status(500).json(err);
    }
  });

// Export the router for use in index.js
module.exports = router;