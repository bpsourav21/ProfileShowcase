import { Router } from "express";
import * as profiles from "../controllers/profile.js";

const router = Router();

// Create a new profile
router.post("/", profiles.create);

// Retrieve all profiles
router.get("/", profiles.findAll);

// Retrieve a single profile with id
router.get("/:id", profiles.findOne);

// Update a profile with id
router.put("/:id", profiles.update);

// Delete a profile with id
router.delete("/:id", profiles.deleteOne);

// Delete all profiles
router.delete("/", profiles.deleteAll);

export default router;
