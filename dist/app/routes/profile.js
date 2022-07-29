"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profiles = __importStar(require("../controllers/profile.js"));
const router = (0, express_1.Router)();
// Create a new profile
router.post("/", profiles.create);
// Retrieve all profiles
router.get("/", profiles.findAll);
// // Retrieve all published profiles
// router.get("/published", profiles.findAllPublished);
// // Retrieve a single profile with id
// router.get("/:id", profiles.findOne);
// // Update a profile with id
// router.put("/:id", profiles.update);
// // Delete a profile with id
// router.delete("/:id", profiles.delete);
// // Delete all profiles
// router.delete("/", profiles.deleteAll);
exports.default = router;
