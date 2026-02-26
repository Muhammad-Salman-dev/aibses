module.exports = (sequelize, Sequelize) => {
  const ProjectTasks = sequelize.define("tbl_ProjectTasks", {
    RecID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    ProjectID: { type: Sequelize.INTEGER }, 
    TaskName: { type: Sequelize.STRING(150) },
    TaskStatus: { type: Sequelize.STRING(50), defaultValue: 'Pending' },
    CompletedDate: { type: Sequelize.DATE },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  });
  return ProjectTasks;
};