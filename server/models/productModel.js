// import admin from '../firebase.js'
// const db = admin.firestore()

// const productCollection =  db.collection("products")

// const createProduct = async(productdata)=>{
//          try{
//         const {pid,productName,productImage,productPrice,productDescription,productCategory,productQuantity,sellerAddress,availableFrom,sellerId,createdAt} = productdata
//          await productCollection.doc(pid).set({
//             productName,
//             productImage,
//             productPrice,
//             productDescription,
//             productCategory,
//             productQuantity,
//             sellerAddress,
//             availableFrom,
//             sellerId,
//             createdAt
//          })
//          return {success:true}
//          }
//          catch(err){
//             console.log("Error Creating Product:", err.message)
//             return {success:false}
//          }
// }

// const getProductByCategory = async (category) => {
//    try {
//        const productCollection = admin.firestore().collection('products');
       
//        // Query the 'products' collection for documents where the 'category' field matches the specified category
//        const querySnapshot = await productCollection.where('productCategory', '==', category).get();

//        if (querySnapshot.empty) {
//            return null; // No products found for this category
//        }

//        // Create an array of product data from the query result
//        const products = querySnapshot.docs.map(doc => doc.data());
//        return products;

//    } catch (err) {
//        console.error("Error fetching products:", err.message);
//        throw err; // Optionally rethrow the error or handle it accordingly
//    }
// };


// const getAllProducts = async () => {
//   try {
//       const snapshot = await productCollection.get();
//       if (snapshot.empty) {
//           return [];
//       }

//       const products = snapshot.docs.map(doc => {
//           return {
//               productId: doc.id,  // Include the document ID as productId
//               ...doc.data()        // Spread the product data
//           };
//       });

//       return products;
//   } catch (err) {
//       console.log(err.message);
//       return [];
//   }
// }


// const getProductById = async (pid) => {
//     try {
//         const productCollection = admin.firestore().collection('products');
//       // Reference to the specific document in the 'products' collection
//          const productDocRef = productCollection.doc(pid);
  
//       // Fetch the document
//        const productDoc = await productDocRef.get();
  
//       // Check if the document exists
//       if (productDoc.exists) {
//         // Return the product data
//         return { success: true, data: productDoc.data() };
//       } else {
//         // Handle the case where the document does not exist
//         console.log(`No product found with ID: ${pid}`);
//         return { success: false, message: 'Product not found' };
//       }
//     } catch (err) {
//       // Log and return the error
//       console.log('Error fetching product:', err.message);
//       return { success: false, message: err.message };
//     }
//   };
  


// export  {createProduct,getProductByCategory ,getAllProducts , getProductById}



import admin from '../firebase.js';
const db = admin.firestore()

class Product {
  constructor({
    pid,
    productName,
    productImage,
    productPrice,
    productDescription,
    productCategory,
    productQuantity,
    sellerAddress,
    availableFrom,
    sellerId,
  }) {
    this.pid = pid;
    this.productName = productName;
    this.productImage = productImage;
    this.productPrice = productPrice;
    this.productDescription = productDescription;
    this.productCategory = productCategory;
    this.productQuantity = productQuantity;
    this.sellerAddress = sellerAddress;
    this.availableFrom = availableFrom;
    this.sellerId = sellerId;
    this.productCollection = db.collection('products');

  }

  // Create a new product
  async createProduct() {
    try {
      await this.productCollection.doc(this.pid).set({
        productName: this.productName,
        productImage: this.productImage,
        productPrice: this.productPrice,
        productDescription: this.productDescription,
        productCategory: this.productCategory,
        productQuantity: this.productQuantity,
        sellerAddress: this.sellerAddress,
        availableFrom: this.availableFrom,
        sellerId: this.sellerId,
        createdAt:  new Date().toISOString()
      });
      return { success: true};
    } catch (err) {
      console.error("Error Creating Product:", err.message);
      return { success: false, error: err.message };
    }
  }

  // Get product by category
  static async getProductByCategory(category) {
    try {
      const productCollection = admin.firestore().collection('products');
      const querySnapshot = await productCollection.where('productCategory', '==', category).get();

      if (querySnapshot.empty) {
        return null; // No products found
      }

      const products = querySnapshot.docs.map(doc => doc.data());
      return products;
    } catch (err) {
      console.error("Error fetching products by category:", err.message);
      throw err;
    }
  }

  // Get all products
  static async getAllProducts() {
    try {
      const productCollection = admin.firestore().collection('products');
      const snapshot = await productCollection.get();

      if (snapshot.empty) {
        return [];
      }

      const products = snapshot.docs.map(doc => ({
        productId: doc.id,
        ...doc.data(),
      }));

      return products;
    } catch (err) {
      console.error("Error fetching all products:", err.message);
      return [];
    }
  }

  // Get product by ID
  static async getProductById(pid) {
    try {
      const productCollection = admin.firestore().collection('products');
      const productDoc = await productCollection.doc(pid).get();

      if (productDoc.exists) {
        return { success: true, data: productDoc.data() };
      } else {
        console.log(`No product found with ID: ${pid}`);
        return { success: false, message: 'Product not found' };
      }
    } catch (err) {
      console.error("Error fetching product by ID:", err.message);
      return { success: false, message: err.message };
    }
  }
}

export default Product;
