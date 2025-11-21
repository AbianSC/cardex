module.exports = (sequelize, Sequelize) => {
  return sequelize.define("inquiry", {
    message: { type: Sequelize.STRING, allowNull: false },
    status:  { type: Sequelize.STRING, allowNull: false, defaultValue: "new" }
  });
};
