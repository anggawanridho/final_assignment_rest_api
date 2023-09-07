const express = require("express");
const userController = require("../controllers/userController");
const loggingMiddleware = require("../middleware/loggingMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(loggingMiddleware);

router.get("/all", roleMiddleware("superuser"), userController.getAllUser);
router.post("/login", userController.auth);
router.post("/register", userController.create);
router.get(
  "/detail/:username",
  roleMiddleware("superuser"),
  userController.getUserDetail
);
router.put(
  "/edit/:username",
  roleMiddleware("superuser"),
  userController.updateUser
);
router.delete(
  "/delete/:username",
  roleMiddleware("superuser"),
  userController.deleteUser
);

module.exports = router;
