const { Router } = require("express");
const {
  createUserController,
  loginUserController,
  logoutUserController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = Router();

router.post("/register", createUserController);
router.get("/login", loginUserController);
router.post("/logout", logoutUserController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
