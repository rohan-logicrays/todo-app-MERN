const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  const newTown = token.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized missing token" });
  }
  try {
    const decoded = jwt.verify(newTown, "your-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};
