const express = require("express");
const router = express.Router();

const {
  getBmwMercedes,
  getCarAndEmail,
  getLastName,
  getPhonePrice,
  getTop10Cities,
} = require("../controllers/User");

router.get("/users/bmwMercedes", getBmwMercedes);
router.get("/users/phonePrice", getPhonePrice);
router.get("/users/lastName", getLastName);
router.get("/users/carAndEmail|", getCarAndEmail);
router.get("/users/top10Cities", getTop10Cities);

module.exports = router;
