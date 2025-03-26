import express from 'express'
import PredictionController from '../controllers/PredictionController.js'
import verifyToken from '../middlewares/verifyToken.js'
import QueryController from '../controllers/queryController.js'


const router = express.Router()

router.post('/recommend', PredictionController.preditCrop)
router.post("/query",verifyToken,QueryController.handleQuery)
export default router