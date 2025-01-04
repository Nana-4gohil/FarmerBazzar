import express from 'express'
import PredictionController from '../controllers/PredictionController.js'
const router = express.Router()

router.post('/recommend', PredictionController.preditCrop)

export default router