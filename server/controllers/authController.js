import admin from '../firebase.js';
import { createUser, getUserByUID } from '../models/userModel.js';
import bcrypt from 'bcryptjs';


class authController {
  // Signup Method
  static signup = async (req, res) => {
    const {email,firstName,lastName,password,phoneNumber,state} = req.body;
    try {
    
      // Check if email is already taken
      const existingUser = await admin.auth().getUserByEmail(email).catch(() => null);
      if (existingUser) {
        return res.status(400).json({ error: "Email is already taken" });
      }
      // Hash password
      // const hashedPassword = await bcrypt.hash(password, 16);

      // Create user in Firebase Authentication
      const firebaseUser = await admin.auth().createUser({
        email,
        password,
        firstName,
        lastName
        // photoURL: profilePicture || null,
      });

      // Add user to Firestore database
      const userData = {
        uid: firebaseUser.uid,
        firstName,
        lastName,
        email,
        phoneNumber,
        state,
        password
        // profilePicture: firebaseUser.photoURL || null,
      };
      const result = await createUser(userData);

      if (result.success) {
        return res.status(201).json({ user: userData, success: true });
      } else {
        return res.status(500).json({ error: "Error saving user to Firestore", success: false });
      }
    } catch (error) {
      console.error("Signup error:", error.message);
      return res.status(500).json({ error: error.message, success: false });
    }
  };

 
  // Login Method
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate Firebase user
      const userRecord = await admin.auth().getUserByEmail(email).catch(() => null);
      console.log(userRecord.password)
      const hashedPassword = await bcrypt.hash(password, 10);
      const isMatch = await bcrypt.compare(password, hashedPassword);
     
      if (!userRecord || !isMatch) {
        return res.status(400).json({ error: "Invalid username or password" });
      }

      // Retrieve user details from Firestore
      const user = await getUserByUID(userRecord.uid);

      if (!user) {
        return res.status(400).json({ error: "User not found in database" });
      }

      // Generate a custom token for session management (optional)
      const customToken = await admin.auth().createCustomToken(userRecord.uid);

      return res.status(200).json({
        user,
        token: customToken,
      });
    } catch (error) {
      console.error("Login error:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // Logout Method
  static logout = async (req, res) => {
    try {
      // Invalidate session on client side
      res.clearCookie("jwt");
      return res.status(200).send({ message: "Successfully logged out" });
    } catch (error) {
      console.error("Logout error:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // GetMe Method
  static getMe = async (req, res) => {
    try {
      const uid = req.user?.uid; // Populated by middleware
      console.log(uid)
      if (!uid) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const user = await getUserByUID(uid); // Fetch user from Firestore

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("GetMe error:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default authController;
