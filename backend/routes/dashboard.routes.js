const authJwt = require("../middleware/authJwt"); // Check karein folder ka naam 'middleware' hi hai
const controller = require("../controllers/dashboard.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // FIX: Controller function ka naam match kar diya hai 'getUserDashboardData'
  app.get(
    "/api/user/dashboard-stats",
    [authJwt.verifyToken],
    controller.getUserDashboardData
  );
};