from flask import Flask, request, jsonify
from waste_classifier import classify_waste
import os

app = Flask(__name__)

# Ensure uploads folder exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/classify', methods=['POST'])
def classify_endpoint():
    """
    API endpoint for classifying waste images.
    """
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No image selected'}), 400

    # Save the uploaded image
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
    image.save(image_path)

    # Classify the image
    classification_results = classify_waste(image_path)

    # Remove the image after classification
    os.remove(image_path)

    if classification_results:
        return jsonify(classification_results), 200
    else:
        return jsonify({'error': 'Classification failed'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)