const express = require('express');
const app = express();
const itemsRoutes = require('./routes/itemsRoutes');
const plantRoutes = require("./routes/plantRoutes");
const exchangeRoutes = require("./routes/exchangeRoutes");

const hbs= require('hbs');


app.set('view engine', 'hbs');
hbs.registerPartials("/views/partial")

app.use(express.json()); // для обработки JSON-тел запросов
app.use('/api', itemsRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/exchanges", exchangeRoutes);



const port = 3000;

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/index', (req, res) => {
    res.send('Welcome to the API!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});