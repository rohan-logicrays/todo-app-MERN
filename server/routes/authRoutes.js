const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/protected", authMiddleware.authenticateUser, (req, res) => {
  res.json({ message: "Authenticated route" });
});
router.get("/profile", authMiddleware.authenticateUser, authController.profile);
router.put('/updateProfile', authMiddleware.authenticateUser,authController.updateProfile)
router.delete('/deleteProfile', authMiddleware.authenticateUser,authController.deleteProfile)

module.exports = router;
