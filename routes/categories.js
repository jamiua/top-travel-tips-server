const router = require("express").Router();
const Category = require("../models/Category");

// Create new category
router.post("/", async (req, res) => {

    // Catch all information sent from body
    const newCategory = new Category(req.body);
    try {
        // Save new category to mongoDB atlas server
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Fetch all categories
router.get("/", async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Export the router for use in index.js
module.exports = router;