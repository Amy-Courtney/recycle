// After resolving, your file should look clean, like this:
const express = require('express');
const router = express.Router();
const multer = require('multer');
const dirtController = require('../controllers/dirtController');

const upload = multer();

router.post('/analyze', upload.single('image'), dirtController.analyzeDirt);

module.exports = router;