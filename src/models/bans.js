/** @format */
const Sequelize = require("sequelize");
const sequelize = require("../../utils/database");

const Bans = sequelize.define("bans", {
  target: Sequelize.STRING,
  reason: Sequelize.TEXT,
  moderator: Sequelize.STRING,
  type: Sequelize.STRING,
  usage_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
});

module.exports = Bans;
