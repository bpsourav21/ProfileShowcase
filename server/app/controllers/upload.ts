import { Request, Response } from "express";
import { PictureModel } from "../models/Picture";

export const uploadImage = (req: Request, res: Response) => {
  const picture = {
    imageName: req.file?.filename || "",
    mimetype: req.file?.mimetype || ""
  };

  // Save Picture in the database
  PictureModel.create(picture)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while saving picture.",
      });
    });
};