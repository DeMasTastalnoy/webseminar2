const express = require('express');
const app = express();
const itemsRoutes = require('./routes/itemsRoutes');

app.set('view engine', 'hbs');

app.use(express.json()); // для обработки JSON-тел запросов
app.use('/api', itemsRoutes);



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