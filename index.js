const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('home');
});

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwerty',
  database: 'joga_mysql',
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected to joga_mysql db');
});

app.listen(3003, () => {
  console.log('App is started at http://localhost:3003');
});
