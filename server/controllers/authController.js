const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { username, password, isAdmin } = req.body;
    const db = req.app.get("db");

    const result = await db.get_user(username).catch(err => console.log(err));
    const existingUser = result[0];

    if (!existingUser) {
      const hash = await bcrypt.hash(password, 10);
      const registeredUser = await db
        .register_user([isAdmin, username, hash])
        .catch(err => console.log(err));

      const user = registeredUser[0];

      req.session.user = {
        isAdmin: user.is_admin,
        username: user.username,
        id: user.id
      };

      res.status(201).json(req.session.user);
    } else {
      res.status(409).json("Username taken");
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");

    const foundUser = await db
      .get_user(username)
      .catch(err => console.log(err));
    const user = foundUser[0];

    if (user) {
      const isAuthenticated = bcrypt.compareSync(password, user.hash);
      if (isAuthenticated) {
        req.session.user = {
          isAdmin: user.is_admin,
          username: user.username,
          id: user.id
        };
        res.status(200).json(req.session.user);
      } else {
        res.status(403).json("Incorrect password");
      }
    } else {
      res
        .status(401)
        .json(
          "User not found. Please register as a new user before logging in."
        );
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  }
};
