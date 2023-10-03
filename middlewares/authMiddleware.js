const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//protected routes token base
const requireSignIn = async (req, res, next) => {
  try {
    let token;
    token = req.cookies.jwt;
    if (token == null) {
      res.sendStatus(401);
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    console.log(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      res.status(401).json({
        message: "unauthorize access",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: "Error in admin middleware",
      error,
    });
  }
};

module.exports = { requireSignIn, isAdmin };
