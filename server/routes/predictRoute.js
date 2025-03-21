import express from 'express'
import PredictionController from '../controllers/PredictionController.js'
import handleQuery  from '../controllers/queryController.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()

router.post('/recommend', PredictionController.preditCrop)
router.post("/query",handleQuery)
export default router