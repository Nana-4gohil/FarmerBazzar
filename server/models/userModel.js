import admin from '../firebase.js'
const db = admin.firestore();

const userCollection = db.collection("users")
 const createUser = async (userData)=>{
           try{
            const {uid,firstName,lastName,email,mobileNumber, state} = userData
              await userCollection.doc(uid).set({
                   firstName,
                   lastName,
                   email,
                   mobileNumber,
                   state,
                   createdAt: admin.firestore.FieldValue.serverTimestamp(),
                });
                return {success : true};
           }
           catch(error){
              console.log("Error Creating user:",error);
              return {success:false,error};
           }
      }

      const getUserByUID = async (uid) => {
        try {
          const usersCollection = admin.firestore().collection('users'); // Make sure 'users' is your collection name
          const userDoc = await usersCollection.doc(uid).get();
      
          if (!userDoc.exists) {
            return null; // User not found
          }
      
          return userDoc.data(); // Return user data
        } catch (error) {
          console.error("Error fetching user:", error.message);
          throw new Error('Failed to fetch user from Firestore');
        }
      }

export {createUser,getUserByUID}















































// const userCollection = db.collection("users")

// const userSchema = new mongoose.Schema({
//     fullName: {
//         type: String,
//         required: true,
//         trim: true, // Removes whitespace
//         minlength: 3, // Minimum length of the name
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true, // Ensures no duplicate emails
//         lowercase: true, // Converts email to lowercase
//         match: [
//             /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//             'Please enter a valid email address',
//         ], // Regex for validating email
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6, // Minimum length of the password
//         select: false, // Prevents password from being returned in queries by default
//     },
//     mobileNumber: {
//         type: String,
//         required: true,
//         unique: true,
//         match: [/^\d{10}$/, 'Mobile number must be 10 digits'], // Ensures only valid 10-digit numbers
//     }
// }, {timestamps : true});

// // Create and Export the Farmer Model
// const User = mongoose.model('User',userSchema);
// export default User
