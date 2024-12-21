import admin from '../firebase.js';
import {createUser,getUserByUID} from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'
import sendMail from '../utils/mailer.js';

const otpStore = {}; 
const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
  if (!regex.test(password)) {
    throw new Error(
      'Password must be at least 6 characters long, include one uppercase letter, one lowercase letter, and one special character'
    );
  }
};

const verifyotp = (email,otp)=>{
       if(!email || !otp){
            return {success:false,error:"Email and OTP requires"}
       }
       const record = otpStore[email]
       console.log(record)
       if(!record){
           return {success:false,error:"Invalid or Expired OTP"}
       }

       const isOtpValid = record.otp=== parseInt(otp,10)
       const isOtpExpired = Date.now() - record.createdAt > 10 * 60 * 1000;
      
       if (isOtpExpired) {
        delete otpStore[email];
        return { success: false, error: 'OTP expired' };
      }
      if (!isOtpValid) {
        return { success: false, error: 'Invalid OTP' };
      }
      delete otpStore[email];
      return { success: true, message: 'Email verified successfully!' };
    }
class authController {

  static requestOtp = async (req, res) => {
    const { email } = req.body;
    try {
      // Check if email is already taken
      const existingUser = await admin.auth().getUserByEmail(email).catch(() => null);
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already taken', success: false });
      }

      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
    
      // Generate OTP
      const otp = crypto.randomInt(100000,1000000);
    
      // Store OTP
      otpStore[email] = {
        otp,
        createdAt: Date.now(),
      };
    
      // Send email
        console.log(otp)
      try {
        await sendMail(email, 'Your OTP Code', `Your OTP for FarmerBazzar is ${otp}. Valid for 10 minutes. Ignor The mail if it is not you`);
        res.status(200).json({ message: 'OTP sent successfully!' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
        console.log(error)
      }
    } catch (error) {
      console.error('Error requesting OTP:', error.message);
      res.status(500).json({ error: 'Failed to request OTP' });
    }
  };
  // Signup Method
  static signup = async (req, res) => {
     const { firstName,lastName, email,mobileNumber,state,password,repassword,Otp} = req.body;
    try {    
     const otpVerification = verifyotp(email,Otp);
      if (!otpVerification.success) {
        return res.status(400).json({ error: otpVerification.error });
      }

      if (password !== repassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      // Check if email is already taken
      const existingUser = await admin.auth().getUserByEmail(email).catch(() => null);
      if (existingUser) {
        return res.status(400).json({ error: "Email is already taken", success: false });
      }

      // Validate password
      validatePassword(password);

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 16);

      // Create user in Firebase Authentication
      const firebaseUser = await admin.auth().createUser({
        email,
        password: hashedPassword,
        displayName: firstName,
      });

      // Add user to Firestore database
      const userData = {
        uid: firebaseUser.uid,
        firstName,
        lastName,
        email,
        mobileNumber,
        state
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

  // Google Signup Method
  static googleSignup = async (req, res) => {
    const {idToken, mobileNumber } = req.body;

    try {
      // Verify Google ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { uid, email, name, picture } = decodedToken;

      // Check if user already exists in Firestore
      const existingUser = await admin.auth().getUser(uid).catch(() => null);

      if (!existingUser) {
        // Add new Google user to Firestore
        const userData = {
          uid,
          fullName: name,
          email,
          mobileNumber,
          profilePicture: picture || null,
        };
        const result = await createUser(userData);

        if (result.success) {
          return res.status(201).json({ user: userData, success: true });
        } else {
          return res.status(500).json({ error: "Error saving Google user to Firestore", success: false });
        }
      } else {
        return res.status(200).json({ user: existingUser, success: true });
      }
    } catch (error) {
      console.error("Google Signup error:", error.message);
      return res.status(500).json({ error: error.message, success: false });
    }
  };

  // Login Method
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate Firebase user
      const userRecord = await admin.auth().getUserByEmail(email).catch(() => null);
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
