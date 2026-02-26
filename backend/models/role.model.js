module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("tbl_Role", {
    RecID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    RoleName: { type: Sequelize.STRING(50) },

    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  });
  return Role;
};