import admin from '../firebase.js';

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization
  
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token); // Verify token using Firebase Admin SDK
      req.user = decodedToken; // Attach the decoded token to the request object
      next(); // Call the next middleware or route handler
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({ error: 'Token verification failed' });
    }
  };
  

export default verifyToken;
