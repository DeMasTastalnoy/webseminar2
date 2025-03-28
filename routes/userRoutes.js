const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.get("/user", authenticateUser, userController.getProfile);
// Страница редактирования профиля
router.get("/profile", authenticateUser, userController.getProfile);
// router.get("/profile",  (req, res, next) => {
//     console.log("Вход в маршрут /profile");
//     next();  // Переход к следующему обработчику
// }, userController.getProfile);


// Обновление профиля
router.post("/profile", authenticateUser, userController.updateProfile);

module.exports = router;
