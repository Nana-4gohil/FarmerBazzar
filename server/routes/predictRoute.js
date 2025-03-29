import express from 'express'
import PredictionController from '../controllers/PredictionController.js'
import QueryController from '../controllers/queryController.js'


const router = express.Router()

router.post('/recommend', PredictionController.preditCrop)
router.post("/query",QueryController.handleQuery)
router.post("/fertilizerRecommend",PredictionController.predictFertilizer)

export default router