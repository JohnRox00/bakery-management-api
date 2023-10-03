const { Router } = require("express");
const {
  createSalesController,
  getAllSalesController,
  updateSalesController,
  deleteSalesController,
  getAllBranchSalesController,
  getTotalSalesGroupByBranchController,
  getSalesByBranchController,
  getSalesByUserController,
} = require("../controllers/salesReportController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = Router();

router.post("/", requireSignIn, createSalesController);
router.get("/", requireSignIn, getAllSalesController);
router.get("/user", requireSignIn, getSalesByUserController);
router.get("/branch/:id", requireSignIn, isAdmin, getSalesByBranchController);
router.get("/branches", requireSignIn, isAdmin, getAllBranchSalesController);
router.get("/group", requireSignIn, getTotalSalesGroupByBranchController);
router.put("/:id", requireSignIn, updateSalesController);
router.delete("/:id", requireSignIn, deleteSalesController);

module.exports = router;
