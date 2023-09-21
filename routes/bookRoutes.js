const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const loggingMiddleware = require("../middleware/loggingMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const allowedRoles = ["admin", "superuser"];

router.use(loggingMiddleware);

router.get("/book", bookController.getAllBook);
router.post("/book", roleMiddleware(allowedRoles), bookController.addBook);
router.get("/book/:isbn", bookController.getBookById);
router.put(
  "/book/:isbn",
  roleMiddleware(allowedRoles),
  bookController.updateBook
);
router.delete(
  "/book/:isbn",
  roleMiddleware(allowedRoles),
  bookController.deleteBook
);

module.exports = router;
