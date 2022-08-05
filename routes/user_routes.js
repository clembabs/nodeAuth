const router = require("express").Router();
const { validationResult } = require("express-validator");

const {
  userRegister,
  userLogin,
  userAuth,
  serializedUser,
  checkRole,
  registerValidation,
  loginValidation,
} = require("../controllers/user_controller");

// Users registration Route
router.post("/register-user", registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);
  await userRegister(req.body, "user", res);
});

// Staff registration Route
router.post(
  "/register-staff",
  registerValidation,
  userAuth,
  checkRole(["staff"]),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    await userRegister(req.body, "staff", res);
  }
);

// Admin registration Route
router.post(
  "/register-admin",
  registerValidation,
  userAuth,
  checkRole(["superadmin"]),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    await userRegister(req.body, "admin", res);
  }
);

//Manager registration Route
router.post(
  "/register-manager",
  registerValidation,
  userAuth,
  checkRole(["manager"]),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    await userRegister(req.body, "manager", res);
  }
);

// Users login Route
router.post("/login-user", loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);
  await userLogin(req.body, "user", res);
});

// Users login Route
router.post("/login-staff", loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);
  await userLogin(req.body, "staff", res);
});

// Adim login Route
router.post("/login-admin", loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);
  await userLogin(req.body, "admin", res);
});

// SuperAdmin login Route
router.post("/login-manageer", loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);
  await userLogin(req.body, "manager", res);
});

// Profile route
router.get("/profile", userAuth, async (req, res) => {
  return res.send(serializedUser(req.user));
});

// Users Protected Route
router.get(
  "/user-protected",
  userAuth,
  checkRole(["user"]),
  async (req, res) => {
    return res.send(serializedUser(req.user));
  }
);

// Staff Protected Route
router.get(
  "/admin-protected",
  userAuth,
  checkRole(["staff"]),
  async (req, res) => {
    return res.send(serializedUser(req.user));
  }
);

// Admin Protected Route
router.get(
  "/admin-protected",
  userAuth,
  checkRole(["admin"]),
  async (req, res) => {
    return res.send(serializedUser(req.user));
  }
);

// Manager Protected Route
router.get(
  "/manager-protected",
  userAuth,
  checkRole(["manager"]),
  async (req, res) => {
    return res.send(serializedUser(req.user));
  }
);

module.exports = router;
