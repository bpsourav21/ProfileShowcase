const Sequelize = require("sequelize");

const dbConfig = {
  DATABASE_URL:
    "postgres://gdfnjpgi:VSakogcaBa2bZBmFq4_zG0yhWyknIX0T@abul.db.elephantsql.com/gdfnjpgi",
  dialect: "postgres",
};
const sequelize = new Sequelize(dbConfig.DATABASE_URL, {
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.profiles = require("../models/Profile")(sequelize, Sequelize);

module.exports = db;
