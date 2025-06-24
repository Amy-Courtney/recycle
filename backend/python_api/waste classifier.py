import torch
from PIL import Image
from torchvision import transforms

# 1. Load the model
try:
    model = torch.load("path/to/your/Augmented-Waste-Classifier-SigLIP2.pth")  # Replace with the actual model file
    model.eval()  # Set the model to evaluation mode (important for inference)
    print("Model loaded successfully")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None  # Set model to None to indicate loading failure

# 2. Define image transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Resize to the expected input size
    transforms.ToTensor(),          # Convert to a PyTorch tensor
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalize (if required by the model)
])

def classify_waste(image_path):
    """
    Classifies an image of waste material using the pre-trained model.

    Args:
        image_path (str): The path to the image file.

    Returns:
        list: A list of dictionaries containing the classification results.
    """
    if model is None:
        return None  # Return None if the model failed to load

    try:
        # 3. Load and preprocess the image
        image = Image.open(image_path)
        image = transform(image).unsqueeze(0)  # Apply transformations and add a batch dimension

        # 4. Run the model (Inference)
        with torch.no_grad():  # Disable gradient calculation during inference
            output = model(image)

        # 5. Post-process the output
        probabilities = torch.nn.functional.softmax(output[0], dim=0)  # Apply softmax to get probabilities
        top5_prob, top5_catid = torch.topk(probabilities, 5)  # Get the top 5 predictions

        # 6. Create results list
        results = []
        for i in range(top5_prob.size(0)):
            results.append({
                'label': f"Category {top5_catid[i].item()}",  # Replace with actual class names if available
                'score': top5_prob[i].item()
            })

        return results
    except Exception as e:
        print(f"Error classifying image: {e}")
        return None

if __name__ == '__main__':
    # Example usage:
    image_path = "path/to/your/waste_image.jpg"  # Replace with a real image path
    classification_results = classify_waste(image_path)

    if classification_results:
        print("Classification Results:")
        print(classification_results)
    else:
        print("Classification failed.")