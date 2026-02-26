module.exports = (sequelize, Sequelize) => {
  const Message = sequelize.define("tbl_Message", {
    RecID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    SenderUserID: { type: Sequelize.INTEGER },
    ReceiverUserID: { type: Sequelize.INTEGER },
    MessageText: { type: Sequelize.STRING(1000) },
    IsRead: { type: Sequelize.BOOLEAN, defaultValue: false },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  });
  return Message;
};