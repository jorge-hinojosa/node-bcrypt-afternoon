require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");

const ac = require("./controllers/authController");
const tc = require("./controllers/treasureController");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const app = express();

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Database connected");
  })
  .catch(err => console.log(err));

app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

//AUTHENTICATION
app.post("/auth/register", ac.register);
app.post("/auth/login", ac.login);
app.get("/auth/logout", ac.logout);

//TREAURE
app.get("/api/treasure/dragon", tc.dragonTreasure);

app.listen(SERVER_PORT, () => console.log(`Yooo I'm on port ${SERVER_PORT}`));
