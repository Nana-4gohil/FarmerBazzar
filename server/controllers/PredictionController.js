import { default as axios } from 'axios';

class PredictionController {
    static preditCrop = async (req, res) => {
        const { temperature, humidity, ph, rainfall } = req.body;

        try {
            // Call the Flask API
            const response = await axios.post(' http://127.0.0.1:5000/predict', {
                temperature, humidity, ph, rainfall
            });

            // Send the response from Flask back to the client
            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error while calling Flask API' });
        }
    }

    static predictFertilizer = async (req,res)=>{
        try {
            const response = await axios.post('http://127.0.0.1:5001/predict-fertilizer', req.body);
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ error: "Error in predicting fertilizer." });
        }
    }
}
export default PredictionController