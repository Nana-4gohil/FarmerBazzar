import express from 'express'

import EquipmentController from '../controllers/EquipmentController.js'
const router = express.Router()

router.post('/add', EquipmentController.AddEquipment)
router.get('/all', EquipmentController.getAllEquipments)
router.get('/filter', EquipmentController.filterByDistance)
export default router