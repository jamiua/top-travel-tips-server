const router = require("express").Router();
const Category = require("../models/Category");

// Create new category
router.post("/", async (req, res) => {

    // Catch all information sent from body
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// New line

// Fetch all categories
// router.get("/", async (req, res) => {
//     try {
//       const categories = await Category.find();
//       res.status(200).json(categories);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports = router;