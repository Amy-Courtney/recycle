// controllers/dirtController.js

const axios = require('axios');
const { FormData } = require('formdata-node'); // Import FormData from formdata-node
const { Blob } = require('node:buffer'); // Import Blob from node:buffer

exports.analyzeDirt = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const imageBuffer = req.file.buffer;

        // Create FormData object
        const formData = new FormData();

        // Append the image to the form data
        formData.append('image', new Blob([imageBuffer]), req.file.originalname);

        // Log the FormData content before sending (for debugging)
        console.log("FormData Content:");
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }


        // Send the image to the Flask API
        const response = await axios.post('http://localhost:5000/classify', formData, {
            headers: {
                ...formData.getHeaders(), // Get headers from FormData
            },
        });

        const classificationResults = response.data;

        console.log('Classification Results from Python API:', classificationResults);

        res.json({
            message: 'Waste analyzed successfully',
            wasteType: classificationResults[0]['label'], // Adjust based on the actual response format
            confidence: classificationResults[0]['score'], // Adjust based on the actual response format
        });

    } catch (error) {
        console.error('Error during waste analysis:', error);
        res.status(500).json({ error: 'An error occurred during waste analysis' });
    }
};
