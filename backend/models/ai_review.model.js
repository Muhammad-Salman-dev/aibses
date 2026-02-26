module.exports = (sequelize, Sequelize) => {
  const AIReview = sequelize.define("tbl_AIReview", {
    RecID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    ProjectID: { type: Sequelize.INTEGER },
    ReviewedBy: { type: Sequelize.INTEGER }, // Admin/User ID
    AIResult: { type: Sequelize.STRING(255) },
    ConfidenceScore: { type: Sequelize.DECIMAL(5, 2) },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  });
  return AIReview;
};