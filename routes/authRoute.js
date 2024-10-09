import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getallRegisteruserController,
  deleteuserController,
  deletecustomerorderController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Register
router.post("/register", registerController);
// Login
router.post("/login", loginController);

router.get("/test", requireSignIn, isAdmin, testController);

// Forgot Password

router.post("/forgot-password", forgotPasswordController);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
//update profile
router.put("/profile", requireSignIn, updateProfileController);
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
// For View the Register user
router.get("/alluser", getallRegisteruserController);
// For Delete the register user
router.delete("/deleteuser/:id", deleteuserController);

// Delete order by ID
router.delete("/delete-order/:id", deletecustomerorderController);

export default router;
