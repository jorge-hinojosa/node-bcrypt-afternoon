require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");

const ac = require("./controllers/authController");
const am = require("./middlewares/authMiddleware");

const tc = require("./controllers/treasureController");

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const app = express();

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("Database connected");
  })
  .catch(err => console.log(err));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.json());
//AUTHENTICATION
app.post("/auth/register", ac.register);
app.post("/auth/login", ac.login);
app.get("/auth/logout", ac.logout);

//TREASURE
app.get("/api/treasure/dragon", tc.dragonTreasure);
app.get("/api/treasure/user", am.usersOnly, tc.userTreasure);
app.post("/api/treasure/user", am.usersOnly, tc.addUserTreasure);
app.get("/api/treasure/all", am.usersOnly, am.adminsOnly, tc.allTreasure);

app.listen(SERVER_PORT, () => console.log(`Yooo I'm on port ${SERVER_PORT}`));
