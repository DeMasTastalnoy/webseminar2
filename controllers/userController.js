const User = require("../models/userModel");

const updateProfile = async (req, res) => {
    try {
        const { region, town } = req.body;
        const userId = req.user.id;
        // Обновляем данные региона и города
        const updatedUser = await User.updateRegionAndTown(userId, region, town);

        // Возвращаем обновленные данные
        res.json({ message: "Профиль успешно обновлен", user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
        // await User.updateRegionAndTown(userId, region, town);
    //     res.json({ message: "Профиль успешно обновлен" });
    // } catch (err) {
    //     res.status(500).json({ error: err.message });
    // }
};

const getProfile = async (req, res) => { //const без точки или exports с точкой
    console.log("req.user:", req.user);
    console.log("Здесь вызываем функцию getProfile")
    try {
        const user = await User.getUserProfile(req.user.id); // Загружаем профиль из БД
        console.log("Отправляемый user:", user);
        res.render("profile", { user });
    } catch (error) {
        console.error("Ошибка при загрузке профиля:", error);
        res.status(500).send("Ошибка сервера");
    }
};

module.exports = { getProfile, updateProfile, };