const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
  .then(() => {
    console.log("--------------------------------------");
    console.log(">>  Database Connect.");
    console.log("--------------------------------------");
  })
  .catch((err) => {
    console.log(">> OOPS! Database Connection Failed: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "ISES Backend is running..." });
});

require('./routes/auth.routes')(app);
require('./routes/dashboard.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});