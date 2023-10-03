const { Router } = require("express");
const {
  getAllProductController,
  updateProductController,
  deleteProductController,
  createProductController,
} = require("../controllers/productController");
const { requireSignIn } = require("../middlewares/authMiddleware");

const router = Router();

router.get("/", requireSignIn, getAllProductController);
router.post("/", requireSignIn, createProductController);
router.put("/:id", requireSignIn, updateProductController);
router.delete("/:id", requireSignIn, deleteProductController);

module.exports = router;
