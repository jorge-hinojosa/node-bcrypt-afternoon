module.exports = {
  dragonTreasure: async (req, res) => {
    const db = req.app.get("db");
    const treasure = await db
      .get_dragon_treasure(1)
      .catch(err => console.log(err));
    res.status(200).json(treasure);
  }
};
