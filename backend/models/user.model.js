module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("tbl_User", {
    RecID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    RoleID: { type: Sequelize.INTEGER }, // Foreign Key
    FullName: { type: Sequelize.STRING(100) },
    Email: { type: Sequelize.STRING(100), unique: true },
    PasswordHash: { type: Sequelize.STRING(255) },
    Phone: { type: Sequelize.STRING(20) },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  });
  return User;
};