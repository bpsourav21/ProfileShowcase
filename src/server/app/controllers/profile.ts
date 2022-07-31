import { Request, Response } from "express";
import { ProfileModel, ProfileDto } from "../models/Profile";
import {
  WorkExperienceDto,
  WorkExperienceModel,
} from "../models/WorkExperience";

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
  const profile: ProfileDto = {
    name: req.body.name,
    age: req.body.age,
    profilePicture: null,
  };

  // Save Profile in the database
  ProfileModel.create(profile)
    .then((data) => {
      const experiences: WorkExperienceDto[] = req.body.experience.map(
        (exp: WorkExperienceDto) => {
          exp.expId = data.id;
          return exp;
        }
      );
      WorkExperienceModel.bulkCreate(experiences)
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

  ProfileModel.findAll({ include: WorkExperienceModel })
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
