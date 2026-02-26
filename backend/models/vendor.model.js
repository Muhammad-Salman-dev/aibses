module.exports = (sequelize, Sequelize) => {
  const Vendor = sequelize.define("tbl_Vendor", {
    RecID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    UserID: { type: Sequelize.INTEGER }, // Foreign Key
    CompanyName: { type: Sequelize.STRING(150) },
    OwnerName: { type: Sequelize.STRING(150) },
    CompanyLogo: { type: Sequelize.STRING(255) },
    NTN: { type: Sequelize.STRING(100) },
    STRN: { type: Sequelize.STRING(100) },
    VerificationStatus: { type: Sequelize.STRING(50), defaultValue: 'Pending' },
    VerificationDate: { type: Sequelize.DATE },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  });
  return Vendor;
};