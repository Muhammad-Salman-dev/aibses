module.exports = (sequelize, Sequelize) => {
  const Projects = sequelize.define("tbl_Projects", {
    RecID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    LeadID: { type: Sequelize.INTEGER },
    VendorID: { type: Sequelize.INTEGER },
    CustomerID: { type: Sequelize.INTEGER },
    ProjectName: { type: Sequelize.STRING(150) },
    ProjectCapacity: { type: Sequelize.DECIMAL(10, 2) },
    StartDate: { type: Sequelize.DATE },
    CompletionDate: { type: Sequelize.DATE },
    ProjectStatus: { type: Sequelize.STRING(50), defaultValue: 'Not Started' },
    ProgressPercent: { type: Sequelize.INTEGER, defaultValue: 0 },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  });
  return Projects;
};