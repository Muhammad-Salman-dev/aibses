module.exports = (sequelize, Sequelize) => {
  const Dispute = sequelize.define("tbl_Dispute", {
    RecID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    ProjectID: { type: Sequelize.INTEGER },
    RaisedByCustomer: { type: Sequelize.INTEGER }, // Customer ID
    DisputeReason: { type: Sequelize.STRING(500) },
    DisputeStatus: { type: Sequelize.STRING(50), defaultValue: 'Open' },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  });
  return Dispute;
};