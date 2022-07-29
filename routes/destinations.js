const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');

require('dotenv').config();

// Get port or use 5050
const PORT = process.env.PORT || 5050;

router.use(express.static('../public'));













// Export the router for use in index.js
module.exports = router;