from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load the trained Random Forest model
with open('crop_recommendation_rf.pkl', 'rb') as file:
    model = pickle.load(file)
fertimodel = pickle.load(open('classifier.pkl','rb'))
ferti = pickle.load(open('fertilizer.pkl','rb'))

# Load Label Encoder (if needed)
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
le.classes_ = np.load('label_classes.npy', allow_pickle=True)  # Assuming you saved classes

# Endpoint to make predictions
@app.route('/predict', methods=['POST'])
def predict_crop():
    try:
        data = request.json
        temperature = data.get('temperature')
        humidity = data.get('humidity')
        ph = data.get('ph')
        rainfall = data.get('rainfall')

        # Check if all parameters are present
        if None in [temperature, humidity, ph, rainfall]:
            return jsonify({'error': 'Missing required parameters'}), 400

        input_data = np.array([[temperature, humidity, ph, rainfall]])
        
        # Make prediction
        prediction = model.predict(input_data)
        recommended_crop = le.inverse_transform(prediction)

        return jsonify({'crop': recommended_crop[0]})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

# Predict Fertilizeer
@app.route('/predict-ferti', methods=['POST'])
def predict_fertilizer():
    try:
        data = request.json
        temp = data.get('temperature')
        humi = data.get('humidity')
        mois = data.get('mositure')
        soil = data.get('soil')
        crop = data.get('crop')
        nitro = data.get('nitrogen')
        phos = data.get('phosphorous')
        pot = data.get('potassium')

        # Check if all parameters are present
        if None in [temp, humi ,mois,soil,crop,nitro,pot,phos]:
            return jsonify({'error': 'Missing required parameters'}), 400
        input_data = np.array([[temp, humi ,mois,soil,crop,nitro,pot,phos]])
        prediction = fertimodel.predict(input_data)
        res = ferti.classes_[prediction]
        return jsonify({'Fertilizer':res[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
