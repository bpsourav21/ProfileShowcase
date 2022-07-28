const router = require("express").Router();
const profileRoute = require("./profile");

router.use("/profiles", profileRoute);

module.exports = router;
