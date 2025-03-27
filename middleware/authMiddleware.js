const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // "Bearer token"

    if (!token) {
        return res.status(401).json({ error: "Доступ запрещен" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Добавляем пользователя в запрос
        next();
    } catch (err) {
        res.status(401).json({ error: "Неверный токен" });
    }
};

module.exports = authenticateUser;
