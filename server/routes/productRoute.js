import express from 'express'
import ProductController  from '../controllers/productController.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = express.Router()

router.post('/Add',verifyToken,ProductController.AddProduct)
router.get('/GetAllProducts',ProductController.getAllproducts)
router.get('/Category/:category', ProductController.getProductByCategory);
router.get('/GetProductById/:pid',ProductController.getProductById)

export default router
 