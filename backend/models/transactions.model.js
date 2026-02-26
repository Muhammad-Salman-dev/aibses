module.exports = (sequelize, Sequelize) => {
  const Transactions = sequelize.define("tbl_Transactions", {
    RecID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    VendorID: { type: Sequelize.INTEGER },
    ProjectID: { type: Sequelize.INTEGER },
    Amount: { type: Sequelize.DECIMAL(18, 2) },
    TransactionDate: { type: Sequelize.DATE },
    Status: { type: Sequelize.STRING(50), defaultValue: 'Pending' }, 
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  });
  return Transactions;
};