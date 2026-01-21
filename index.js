const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const { engine } = require("express-handlebars");

const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
  })
);


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwerty", 
  database: "joga_mysql",  
});

con.connect((err) => {
  if (err) {
    console.error(" MySQL connect error:", err.message);
    process.exit(1);
  }
  console.log(" Connected to MySQL");
});


app.get("/", (req, res) => {
  const query = "SELECT * FROM article";
  con.query(query, (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.render("index", { articles: result });
  });
});


app.get("/article/:slug", (req, res) => {
  const query = "SELECT * FROM article WHERE slug = ? LIMIT 1";
  con.query(query, [req.params.slug], (err, result) => {
    if (err) return res.status(500).send(err.message);
    if (!result.length) return res.status(404).send("Article not found");

    res.render("article", { article: result[0] });
  });
});


app.listen(3000, () => {
  console.log("App is started at http://localhost:3000");
});
