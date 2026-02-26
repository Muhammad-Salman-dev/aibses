module.exports = (sequelize, Sequelize) => {
  const EarningsWallet = sequelize.define("tbl_EarningsWallet", {
    RecID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    VendorID: { type: Sequelize.INTEGER }, // Foreign Key
    AvailableBalance: { type: Sequelize.DECIMAL(18, 2), defaultValue: 0.00 },
    PendingBalance: { type: Sequelize.DECIMAL(18, 2), defaultValue: 0.00 },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  });
  return EarningsWallet;
};