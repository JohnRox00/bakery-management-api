const { hashPassword } = require("../helpers/authHelpers");
const userModel = require("../models/userModel");

// @desc Get All User
// route GET /api/v1/users
// @access Private
const getAllUsersController = async (req, res) => {
  const users = await userModel.find({});
  try {
    res.status(200).json({
      message: "All users get Successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting users",
      error,
    });
  }
};

const editUserController = async (req, res) => {
  try {
    const { branch_name, address, email, password } = req.body;
    const user = await userModel
      .findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            branch_name,
            address,
            email,
            password: await hashPassword(password),
          },
        }
      )
      .select("-password");

    res.status(200).json({
      message: "Edit User Successfully",
      data: user,
    });
  } catch (error) {
    res.status(200).json({
      message: "Error in editing the user",
      error,
    });
  }
};

module.exports = {
  getAllUsersController,
  editUserController,
};
