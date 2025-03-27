const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Проверяем, есть ли пользователь с таким email
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "Пользователь уже существует" });
        }

        // Создаем пользователя
        const newUser = await User.create(name, email, password);
        const token = generateToken(newUser);

        res.status(201).json({ user: newUser, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(400).json({ error: "Неверный email или пароль" });
        }

        // Проверяем пароль
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Неверный email или пароль" });
        }

        const token = generateToken(user);
        res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
