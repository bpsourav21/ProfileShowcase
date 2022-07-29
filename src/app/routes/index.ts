import { Router } from "express";
import profileRoute from "./profile";

const router = Router();

router.use("/profiles", profileRoute);

export default router;
