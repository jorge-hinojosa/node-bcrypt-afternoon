module.exports = {
  dragonTreasure: async (req, res) => {
    const db = req.app.get("db");
    const treasure = await db
      .get_dragon_treasure(1)
      .catch(err => console.log(err));
    res.status(200).json(treasure);
  },
  userTreasure: async (req, res) => {
    const db = req.app.get("db");
    const treasure = await db
      .get_user_treasure([req.session.user.id])
      .catch(err => console.log(err));
    res.status(200).json(treasure);
  },
  addUserTreasure: async (req, res) => {
    const { id } = req.session.user;
    const { treasureUrl } = req.body;
    const db = req.app.get("db");

    const treasure = await db
      .add_user_treasure([treasureUrl, id])
      .catch(err => console.log(err));
    res.status(200).json(treasure);
  }
};
