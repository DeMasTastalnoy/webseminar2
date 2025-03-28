const express = require('express');
const app = express();
require("dotenv").config();
const itemsRoutes = require('./routes/itemsRoutes');
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");
const exchangeRoutes = require("./routes/exchangeRoutes");
const path = require("path");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const authenticateUser = require("./middleware/authMiddleware");
const userRoutes = require("./routes/userRoutes"); // Путь к маршрутам пользователя


dotenv.config();

const hbs= require('hbs');

app.engine("hbs", exphbs.engine({ extname: "hbs", defaultLayout: "main" }));
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "views"));

// hbs.registerPartials("/views/partial")
hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // для обработки JSON-тел запросов
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.error("Ошибка валидации токена:", err.message);
        }
    }
    next();
});


app.use('/api', itemsRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/exchanges", exchangeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes); // Путь, на который будет обращаться клиент


app.get("/register", (req, res) => res.render("register"));
app.get("/login", (req, res) => res.render("login"));
// app.get("/dashboard", (req, res) => res.render("dashboard"));
app.get("/dashboard",  authenticateUser,(req, res) => {
    console.log("Запрос на /dashboard получен");
    if (!req.user) {
        return res.redirect("/login"); // Если нет токена, перенаправляем
    }
    const user = req.user || { name: "Гость", email: "guest@example.com" };
    res.render("dashboard", { user });
});
app.get("/profile", authenticateUser, (req, res) => {
    res.render("profile", { user: req.user });
});


const port = 3000;

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/index', (req, res) => {
    res.send('Welcome to the API!');
});

console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});