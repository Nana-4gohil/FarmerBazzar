import admin from '../firebase.js'
const db = admin.firestore()

const productCollection =  db.collection("products")

const createProduct = async(productdata)=>{
         try{
        const {pid,productName,productImage,productPrice,productDescription,productCategory,productQuantity,sellerAddress,avilablefrom,sellerId} = productdata
         await productCollection.doc(pid).set({
            productName,
            productImage,
            productPrice,
            productDescription,
            productCategory,
            productQuantity,
            sellerAddress,
            avilablefrom,
            sellerId
         })
         return {success:true}
         }
         catch(err){
            console.log("Error Creating Product:", err.message)
            return {success:false}
         }
}

const getProductByCategory = async (category) => {
   try {
       const productCollection = admin.firestore().collection('products');
       
       // Query the 'products' collection for documents where the 'category' field matches the specified category
       const querySnapshot = await productCollection.where('productCategory', '==', category).get();

       if (querySnapshot.empty) {
           return null; // No products found for this category
       }

       // Create an array of product data from the query result
       const products = querySnapshot.docs.map(doc => doc.data());
       return products;

   } catch (err) {
       console.error("Error fetching products:", err.message);
       throw err; // Optionally rethrow the error or handle it accordingly
   }
};


const getAllProducts = async () => {
  try {
      const snapshot = await productCollection.get();
      if (snapshot.empty) {
          return [];
      }

      const products = snapshot.docs.map(doc => {
          return {
              productId: doc.id,  // Include the document ID as productId
              ...doc.data()        // Spread the product data
          };
      });

      return products;
  } catch (err) {
      console.log(err.message);
      return [];
  }
}


const getProductById = async (pid) => {
    try {
        const productCollection = admin.firestore().collection('products');
      // Reference to the specific document in the 'products' collection
         const productDocRef = productCollection.doc(pid);
  
      // Fetch the document
       const productDoc = await productDocRef.get();
  
      // Check if the document exists
      if (productDoc.exists) {
        // Return the product data
        return { success: true, data: productDoc.data() };
      } else {
        // Handle the case where the document does not exist
        console.log(`No product found with ID: ${pid}`);
        return { success: false, message: 'Product not found' };
      }
    } catch (err) {
      // Log and return the error
      console.log('Error fetching product:', err.message);
      return { success: false, message: err.message };
    }
  };
  


export  {createProduct,getProductByCategory ,getAllProducts , getProductById}