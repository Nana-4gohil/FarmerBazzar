from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to call this API

# Load Model & Label Encoders
with open("fertilizer_recommendation.pkl", "rb") as model_file:
    model = pickle.load(model_file)

with open("label_encoders.pkl", "rb") as enc_file:
    label_encoders = pickle.load(enc_file)

@app.route('/predict-fertilizer', methods=['POST'])
def predict():
    try:
        data = request.json

        # Encode input values
        encoded_input = [
            label_encoders["Crop Name"].transform([data["crop_name"]])[0],
            label_encoders["Soil Type"].transform([data["soil_type"]])[0],
            data["pH_level"],  # pH is numerical, no encoding needed
            label_encoders["Climate Condition"].transform([data["climate_condition"]])[0]
        ]

        # Predict fertilizer
        prediction = model.predict([encoded_input])
        recommended_fertilizer = label_encoders["Recommended Fertilizer"].inverse_transform(prediction)[0]

        return jsonify({"recommended_fertilizer": recommended_fertilizer})

    except KeyError:
        return jsonify({"error": "Invalid input values!"}), 400

if __name__ == '__main__':
    app.run(port=5001, debug=True)
