const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { username, password, isAdmin } = req.body;
    const db = req.app.get("db");

    const result = await db.get_user(username).catch(err => console.log(err));
    const existingUser = result[0];

    if (!existingUser) {
      const hash = bcrypt.hash(password, 10);
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
  }
};
