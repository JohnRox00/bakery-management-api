const { Router } = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  getAllUsersController,
  editUserController,
} = require("../controllers/userController");

const router = Router();

router.get("/", requireSignIn, isAdmin, getAllUsersController);
router.put("/:id", requireSignIn, isAdmin, editUserController);

module.exports = router;
