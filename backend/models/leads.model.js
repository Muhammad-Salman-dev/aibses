module.exports = (sequelize, Sequelize) => {
  const Leads = sequelize.define("tbl_Leads", {
    RecID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    RequestID: { type: Sequelize.INTEGER },
    AIModelPath: { type: Sequelize.STRING(255) }, // 3D Model ka link
    LeadStatus: { type: Sequelize.STRING(50), defaultValue: 'Open' },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  });
  return Leads;
};