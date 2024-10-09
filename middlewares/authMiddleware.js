import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// protected Routes Token based
export const requireSignIn = (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      sucess: "false",
      error,
      message: "Error in Admin Middleware",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        sucess: false,
        message: "Unotherize Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
