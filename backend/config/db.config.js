module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "2025",
  DB: "wazoschema",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
