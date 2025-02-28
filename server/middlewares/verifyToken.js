import admin from '../firebase.js';

const verifyToken = async (req, res, next) => {
     const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided or invalid format' });
    }

    const token = authHeader.split('Bearer ')[1];

    // Extract the token part
    //  console.log(token)
    try {
        const decodedToken = await admin.auth().verifyIdToken(token,true);
        req.user = decodedToken; // Attach the decoded token to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ error: 'Token verification failed' });
    }
};

export default verifyToken;
