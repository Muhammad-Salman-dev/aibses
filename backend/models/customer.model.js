module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("tbl_Customer", {
    RecID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    UserID: { type: Sequelize.INTEGER }, 
    City: { type: Sequelize.STRING(100) },
    Address: { type: Sequelize.STRING(255) },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  });
  return Customer;
};