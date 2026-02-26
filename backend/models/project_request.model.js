module.exports = (sequelize, Sequelize) => {
  const ProjectRequest = sequelize.define("tbl_ProjectRequest", {
    RecID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    CustomerID: { type: Sequelize.INTEGER },
    RequiredCapacity: { type: Sequelize.DECIMAL(10, 2) },
    PropertyType: { type: Sequelize.STRING(50) },
    RoofSize: { type: Sequelize.DECIMAL(10, 2) },
    Location: { type: Sequelize.STRING(150) },
    Budget: { type: Sequelize.DECIMAL(18, 2) },
    Timeline: { type: Sequelize.STRING(100) },
    RequestStatus: { type: Sequelize.STRING(50), defaultValue: 'Pending' },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  });
  return ProjectRequest;
};