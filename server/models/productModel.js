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


const getAllProducts = async()=>{
       try{
          const snapshot = await productCollection.get();
          if(snapshot.empty){
              return []
          }
          const products = snapshot.docs.map(doc=>doc.data())
          return products
       }catch(err){
           console.log(err.message)
           return [];
       }
}


export  {createProduct,getProductByCategory ,getAllProducts}