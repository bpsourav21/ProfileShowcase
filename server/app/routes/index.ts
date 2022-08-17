import { Router } from "express";
import profileRoute from "./profile";
import uploadRoute from "./upload";

const router = Router();

router.use("/profiles", profileRoute);
router.use('/uploadImage', uploadRoute)

export default router;
