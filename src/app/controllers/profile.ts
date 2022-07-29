import { Request, Response } from "express";
import { Profile } from "../models/Profile";
import { WorkExperience } from "../models/WorkExperience";

// Create and Save a new profile
export const create = (req: Request, res: Response) => {
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
      //@ts-ignore
      const experiences = req.body.experience.map((exp) => {
        //@ts-ignore
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
export const findAll = (req: Request, res: Response) => {
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
