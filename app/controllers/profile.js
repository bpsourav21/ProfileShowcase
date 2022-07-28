const sequelize = require("../db/index");
const Profile = require("../models/Profile");
const WorkExperience = require("../models/WorkExperience");
const Op = sequelize.Op;

// Create and Save a new profile
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Profile
  const profile = {
    name: req.body.name,
    age: req.body.age,
  };

  // Save Profile in the database
  Profile.create(profile)
    .then((data) => {
      const experiences = req.body.experience.map((exp) => {
        exp.expId = data.id;
        return exp;
      });
      WorkExperience.bulkCreate(experiences)
        .then((data2) => {
          res.send("success");
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the experience.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Profile.",
      });
    });
};

// Retrieve all Profiles from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Profile.findAll({ include: WorkExperience })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Profiles.",
      });
    });
};
