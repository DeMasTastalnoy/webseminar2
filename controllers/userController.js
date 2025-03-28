const User = require("../models/userModel");

exports.getProfile = async (req, res) => {
    // res.render("profile", { user: req.user });
    try {
        // Проверяем, что пользователь авторизован
        if (!req.user) {
            return res.status(401).json({ error: "Требуется авторизация" });
        }
        // Возвращаем данные пользователя
        res.json(req.user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { region, town } = req.body;
        const userId = req.user.id;

        await User.updateRegionAndTown(userId, region, town);
        res.json({ message: "Профиль успешно обновлен" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
