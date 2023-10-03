const salesModel = require("../models/salesModel");
const userModel = require("../models/userModel");
const startOfDay = require("date-fns/startOfDay");

// @desc Create Sales
// route POST /api/v1/sales
// @access Private
const createSalesController = async (req, res) => {
  const { name, category, quantity, price } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!quantity) {
      return res.status(400).json({ message: "quantity is required" });
    }
    if (!price) {
      return res.status(400).json({ message: "price is required" });
    }
    //store sale to database
    const sales = await salesModel.create({
      user_id: req.user._id,
      name,
      category,
      quantity,
      price,
      total: quantity * price,
    });
    res.status(200).json({
      message: "Sales added successfully",
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in adding sales",
      error,
    });
  }
};

// @desc Get Sales
// route GET /api/v1/sales
// @access Private
const getAllSalesController = async (req, res) => {
  try {
    //get all sale of user from database
    const sales = await salesModel
      .find({ user_id: req.user._id })
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "All sales get successfully",
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting all products",
      error,
    });
  }
};

// @desc Get Sales
// route GET /api/v1/sales/branches
// @access Private
const getAllBranchSalesController = async (req, res) => {
  try {
    //get all sale of user from database
    const sales = await salesModel.find({}).sort({ createdAt: -1 });
    const demo = await salesModel.aggregate([
      {
        $match: {},
      },
      {
        $group: {
          _id: { $month: "$date" },
          sales: { $push: { amount: "$total", date: "$date" } },
          totalSales: { $sum: "$total" },
        },
      },
      { $sort: { date: -1, _id: 1 } },
    ]);
    res.status(200).json({
      message: "All sales get successfully",
      data: demo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting all products",
      error,
    });
  }
};

// @desc update Sales
// route PUT /api/v1/sales/:id
// @access Private
const updateSalesController = async (req, res) => {
  try {
    //update sale from database
    const sales = await salesModel.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json({
      message: "Update sales successfully",
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in updating sales",
      error,
    });
  }
};

// @desc delete Sales
// route DELETE /api/v1/sales/:id
// @access Private
const deleteSalesController = async (req, res) => {
  try {
    //delete sale from database
    const sales = await salesModel.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "Sales deleted successfully",
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in updating sales",
      error,
    });
  }
};

// @desc Get Sales by id
// route GET /api/v1/sales/:id
// @access Private
const getTotalSalesGroupByBranchController = async (req, res) => {
  try {
    const demo = await salesModel.aggregate([
      {
        $match: {
          date: {
            $gte: startOfDay(new Date()),
          },
        },
      },
      {
        $group: {
          _id: "$user_id",
          sales: {
            $push: { date: "$date", branch_name: "$branch_name" },
          },
          totalSales: { $sum: "$total" },
        },
      },
    ]);

    res.status(200).json({
      data: demo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting all sales",
      error,
    });
  }
};

// @desc Get Sales By Branch
// route GET /api/v1/branch/:id
// @access Private isAdmin
const getSalesByBranchController = async (req, res) => {
  try {
    const sales = await salesModel.find({ user_id: req.params.id });
    let salesId = sales[0].user_id;
    const demo = await salesModel.aggregate([
      {
        $match: { user_id: salesId },
      },
      {
        $group: {
          _id: { $month: "$date" },
          sales: {
            $push: {
              amount: "$total",
              date: "$date",
              product: "$name",
              quantity: "$quantity",
            },
          },
          totalSales: { $sum: "$total" },
        },
      },
      { $sort: { date: -1, _id: 1 } },
    ]);

    res.status(200).json({
      message: "getting sales successfully",
      data: demo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting sales",
    });
  }
};

// @desc Get Sales By Users
// route GET /api/v1/sales/user
// @access Private
const getSalesByUserController = async (req, res) => {
  try {
    const sales = await salesModel.find({ user_id: req.user._id });
    const demo = await salesModel.aggregate([
      {
        $match: { user_id: req.user._id },
      },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          sales: {
            $push: {
              amount: "$total",
              date: "$date",
              product: "$name",
              quantity: "$quantity",
            },
          },
          totalSales: { $sum: "$total" },
        },
      },
      { $sort: { date: -1, _id: 1 } },
    ]);

    res.status(200).json({
      message: "getting sales successfully",
      data: demo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error in getting sales",
    });
  }
};

module.exports = {
  createSalesController,
  getAllSalesController,
  updateSalesController,
  deleteSalesController,
  getAllBranchSalesController,
  getTotalSalesGroupByBranchController,
  getSalesByBranchController,
  getSalesByUserController,
};
