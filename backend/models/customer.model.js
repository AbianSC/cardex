module.exports = (sequelize, Sequelize) => {
  return sequelize.define("customer", {
    name:  { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    phone: { type: Sequelize.STRING, allowNull: false }
  });
};
