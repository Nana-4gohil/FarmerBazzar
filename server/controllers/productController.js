import { createProduct, getAllProducts,getProductByCategory,getProductById} from '../models/productModel.js';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';

dotenv.config();

class ProductController {

  static AddProduct = async (req, res) => {
    const {
      productName,
      productImage,
      productPrice,
      productDescription,
      productCategory,
      productQuantity,
      sellerAddress,
      avilablefrom,
    } = req.body;

    try {
      // console.log(req.files)
      console.log(req.body)
      // console.log(req.header)
     

      if (!productName || !productImage  || !productPrice || !productDescription || !productCategory || !productQuantity || !sellerAddress || !avilablefrom) {
        return res.status(400).json({
          message: 'All data are required',
          success: false
        });
      }

      const Pid = uuidv4();

      // console.log(productImage)
      if (productImage) {
        const uploadedRes = await cloudinary.uploader.upload(productImage)
        productImage = uploadedRes.secure_url
      }
    // console.log(productImage)
      // Upload the image to Cloudinary
     
        const productData = {
          pid: Pid,
          productName,
          productImage,
          productPrice,
          productDescription,
          productCategory,
          productQuantity,
          sellerAddress,
          avilablefrom,
          sellerId: req.user.uid,
        };

        const createResult = await createProduct(productData);

        if (createResult.success) {
          return res.status(201).json({ product: productData, success: true });
        } else {
          return res.status(500).json({ error: "Error saving Product to Firestore", success: false });
        }
    } catch (error) {
      console.error("Add Product Error:", error.message);
      return res.status(500).json({ error: error.message, success: false });
    }
  }

  static getProductById = async(req,res)=>{
           const {pid} = req.params
          const product = await getProductById(pid)
           return res.status(200).json({
               product
           })
  }
  static getAllproducts = async (req, res) => {
    const products = await getAllProducts();
    return res.status(200).json({ products });
  } 


  static getProductByCategory  = async(req,res)=>{
        const { category } = req.params;
        console.log(category)
        const products = await getProductByCategory(category);
        return res.status(200).json({
            products
        })
  }
}
export default ProductController;
