import jwt from "jsonwebtoken";
import User from "../models/userData.model.js";

export const authVerifier = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id).select("-password");
      next();
    } catch (error) {
      let err = new Error("Token failed, can't authorize access.");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("There's no token. Can't authenticate.");
    error.statusCode = 401;
    next(error);
  }
};

export const adminVerifier = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    let error = new Error("Can't authorized, not mentor/admin");
    error.statusCode = 401;
    next(error);
  }
};