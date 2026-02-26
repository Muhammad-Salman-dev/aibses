module.exports = {
  HOST: "localhost",
  USER: "sa",
  PASSWORD: "Salman03220038",
  DB: "ises_db",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};