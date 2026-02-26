const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// --- MODELS IMPORT ---
db.role = require("./role.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.customer = require("./customer.model.js")(sequelize, Sequelize);
db.vendor = require("./vendor.model.js")(sequelize, Sequelize);
db.projectRequest = require("./project_request.model.js")(sequelize, Sequelize);
db.leads = require("./leads.model.js")(sequelize, Sequelize);
db.vendorBids = require("./vendor_bids.model.js")(sequelize, Sequelize);
db.projects = require("./projects.model.js")(sequelize, Sequelize);
db.projectTasks = require("./project_tasks.model.js")(sequelize, Sequelize);
db.earningsWallet = require("./earnings_wallet.model.js")(sequelize, Sequelize);
db.transactions = require("./transactions.model.js")(sequelize, Sequelize);
db.dispute = require("./dispute.model.js")(sequelize, Sequelize);
db.message = require("./message.model.js")(sequelize, Sequelize);
db.aiReview = require("./ai_review.model.js")(sequelize, Sequelize);

// --- RELATIONSHIPS (JOINS) ---

// 1. Role <-> User
db.role.hasMany(db.user, { foreignKey: "RoleID" });
db.user.belongsTo(db.role, { foreignKey: "RoleID" });

// 2. User <-> Customer
db.user.hasOne(db.customer, { foreignKey: "UserID" });
db.customer.belongsTo(db.user, { foreignKey: "UserID" });

// 3. User <-> Vendor
db.user.hasOne(db.vendor, { foreignKey: "UserID" });
db.vendor.belongsTo(db.user, { foreignKey: "UserID" });

// 4. Customer <-> ProjectRequest
db.customer.hasMany(db.projectRequest, { foreignKey: "CustomerID" });
db.projectRequest.belongsTo(db.customer, { foreignKey: "CustomerID" });

// 5. Request <-> Leads
db.projectRequest.hasOne(db.leads, { foreignKey: "RequestID" });
db.leads.belongsTo(db.projectRequest, { foreignKey: "RequestID" });

// 6. Leads <-> Vendor Bids
db.leads.hasMany(db.vendorBids, { foreignKey: "LeadID" });
db.vendorBids.belongsTo(db.leads, { foreignKey: "LeadID" });

// 7. Vendor <-> Vendor Bids
db.vendor.hasMany(db.vendorBids, { foreignKey: "VendorID" });
db.vendorBids.belongsTo(db.vendor, { foreignKey: "VendorID" });

// 8. Leads <-> Projects (Jab Bid win hojaye)
db.leads.hasOne(db.projects, { foreignKey: "LeadID" });
db.projects.belongsTo(db.leads, { foreignKey: "LeadID" });

// 9. Projects <-> Tasks
db.projects.hasMany(db.projectTasks, { foreignKey: "ProjectID" });
db.projectTasks.belongsTo(db.projects, { foreignKey: "ProjectID" });

// --- FINANCE RELATIONS ---
// Vendor <-> Wallet
db.vendor.hasOne(db.earningsWallet, { foreignKey: "VendorID" });
db.earningsWallet.belongsTo(db.vendor, { foreignKey: "VendorID" });

// Vendor <-> Transactions
db.vendor.hasMany(db.transactions, { foreignKey: "VendorID" });
db.transactions.belongsTo(db.vendor, { foreignKey: "VendorID" });

// Project <-> Transactions
db.projects.hasMany(db.transactions, { foreignKey: "ProjectID" });
db.transactions.belongsTo(db.projects, { foreignKey: "ProjectID" });

// --- ADMIN/SUPPORT RELATIONS ---
// Project <-> Dispute
db.projects.hasMany(db.dispute, { foreignKey: "ProjectID" });
db.dispute.belongsTo(db.projects, { foreignKey: "ProjectID" });

// Project <-> AI Review
db.projects.hasMany(db.aiReview, { foreignKey: "ProjectID" });
db.aiReview.belongsTo(db.projects, { foreignKey: "ProjectID" });

// Users <-> Messages (Chat)
// Sender
db.user.hasMany(db.message, { as: "SentMessages", foreignKey: "SenderUserID" });
db.message.belongsTo(db.user, { as: "Sender", foreignKey: "SenderUserID" });

// Receiver
db.user.hasMany(db.message, { as: "ReceivedMessages", foreignKey: "ReceiverUserID" });
db.message.belongsTo(db.user, { as: "Receiver", foreignKey: "ReceiverUserID" });

module.exports = db;