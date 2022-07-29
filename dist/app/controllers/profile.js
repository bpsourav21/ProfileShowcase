"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAll = exports.create = void 0;
const Profile_1 = require("../models/Profile");
const WorkExperience_1 = require("../models/WorkExperience");
// Create and Save a new profile
const create = (req, res) => {
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
    Profile_1.Profile.create(profile)
        .then((data) => {
        //@ts-ignore
        const experiences = req.body.experience.map((exp) => {
            //@ts-ignore
            exp.expId = data.id;
            return exp;
        });
        WorkExperience_1.WorkExperience.bulkCreate(experiences)
            .then((data2) => {
            res.send("success");
        })
            .catch((err) => {
            res.status(500).send({
                message: err.message ||
                    "Some error occurred while creating the experience.",
            });
        });
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Profile.",
        });
    });
};
exports.create = create;
// Retrieve all Profiles from the database.
const findAll = (req, res) => {
    const name = req.query.name;
    // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    Profile_1.Profile.findAll({ include: WorkExperience_1.WorkExperience })
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Profiles.",
        });
    });
};
exports.findAll = findAll;
