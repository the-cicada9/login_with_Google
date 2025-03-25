const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization"); // Token from headers

  console.log(token , ">>token verify");
  
  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded , ">><<<");
    
    req.user = { 
      userId: decoded.userId, 
      email: decoded.email 
    };  // Attach user payload to request
    console.log(req.user , ">>>decoded");
    
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
