const { Router } = require("express");
const {
  createUserController,
  loginUserController,
  logoutUserController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = Router();

router.post("/register", createUserController);
router.post("/login", loginUserController);
router.post("/logout", logoutUserController);

//protected User route auth
router.post("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.post("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
