const { hashPassword, comparePassword } = require("../helpers/authHelpers");
const generateToken = require("../helpers/generateToken");
const userModel = require("../models/userModel");

// @desc Create User
// route POST /api/v1/auth/register
// @access Public
const createUserController = async (req, res) => {
  const { branch_name, email, password, address } = req.body;
  try {
    if (!branch_name) {
      return res.json({
        message: "Branch name is required",
      });
    }
    if (!email) {
      return res.json({
        message: "email is required",
      });
    }
    if (!password) {
      return res.json({
        message: "password is required",
      });
    }
    if (!address) {
      return res.json({
        message: "address is required",
      });
    }
    //checking if user with the same email in database
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }
    //hashing password
    const hashedPassword = await hashPassword(password);
    //store user to database
    const user = userModel.create({
      branch_name,
      email,
      password: hashedPassword,
      address,
    });
    res.status(200).json({
      message: "User created successfully",
      user: {
        branch_name,
        email,
        address,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in creating user",
      error,
    });
  }
};

// @desc Login User
// route POST /api/v1/auth/login
// @access Public
const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email && !password) {
      return res.status(401).json({
        message: "email and password are required",
      });
    }
    if (!email) {
      return res.status(401).json({
        message: "email is required",
      });
    }
    if (!password) {
      return res.status(401).json({
        message: "password is required",
      });
    }
    //checking if user's email is existing in database
    const user = await userModel.findOne({ email });
    //checking if password is match from database
    const match = await comparePassword(password, user.password);
    if (!user || !match) {
      return res.status(401).json({
        message: "invalid email or password",
      });
    }
    generateToken(res, user._id);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        branch_name: user.branch_name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in login user",
      error,
    });
  }
};

// @desc Logout User
// route POST /api/v1/auth/logout
// @access Public
const logoutUserController = async (req, res) => {
  try {
    res.clearCookie("jwt", "", {
      httpOnly: true,
      expiresIn: Date.now(),
    });
    res.status(200).json({ message: " User logged out Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in User log out " });
  }
};

module.exports = {
  createUserController,
  loginUserController,
  logoutUserController,
};
