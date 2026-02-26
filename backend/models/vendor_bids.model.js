module.exports = (sequelize, Sequelize) => {
  const VendorBids = sequelize.define("tbl_VendorBids", {
    RecID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    LeadID: { type: Sequelize.INTEGER },
    VendorID: { type: Sequelize.INTEGER },
    QuotationPrice: { type: Sequelize.DECIMAL(18, 2) },
    PanelBrand: { type: Sequelize.STRING(100) },
    InverterBrand: { type: Sequelize.STRING(100) },
    WarrantyYears: { type: Sequelize.INTEGER },
    BidStatus: { type: Sequelize.STRING(50), defaultValue: 'Pending' }, 
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    is_deleted: { type: Sequelize.BOOLEAN, defaultValue: false }
  });
  return VendorBids;
};