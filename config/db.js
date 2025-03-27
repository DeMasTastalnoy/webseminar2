const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: 'uits12345',
    port: 5432,
});

client.connect();

module.exports = client;