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

// Retrieve one Profile from the database.
export const findOne = (req, res) => {
  const id = req.params.id;

  ProfileModel.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Profile with id=" + id
      });
    });
};

// Update a Profile by the id in the request
export const update = (req, res) => {
  const id = req.params.id;

  ProfileModel.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num[0] == 1) {
        res.send({
          message: "Profile was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Profile with id=${id}. Maybe ProfileModel was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Profile with id=" + id
      });
    });
};

// Delete a Profile with the specified id in the request
export const deleteOne = (req, res) => {
  const id = req.params.id;

  ProfileModel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Profile was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Profile with id=${id}. Maybe ProfileModel was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Profile with id=" + id
      });
    });
};

// Delete all Profiles from the database.
export const deleteAll = (req, res) => {
  ProfileModel.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Profiles were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Profiles."
      });
    });
};
