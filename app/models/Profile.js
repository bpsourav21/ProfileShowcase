module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define("profile", {
    Name: {
      type: Sequelize.STRING
    },
    Age: {
      type: Sequelize.INTEGER
    }
  });

  return Profile;
};
