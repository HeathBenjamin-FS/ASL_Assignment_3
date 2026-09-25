// Load in Express framework
const express = require(`express`);

// Load in file middleware
const { uploadFile } = require("../middlewares/index.js");

// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`);
const starUpload = uploadFile("stars");

// Create a new Router instance and call it "router"
const router = new express.Router();

// HTML mappings
router.get("/new", starCtlr.form);
router.get("/:id/edit", starCtlr.form);
router.get("/:id/delete", starCtlr.remove);

// RESTful resource mappings
router.get(`/`, starCtlr.index);
router.post(`/`, starCtlr.create, starUpload);
router.get(`/:id`, starCtlr.show);
router.post(`/:id`, starCtlr.update, starUpload);
router.delete(`/:id`, starCtlr.remove);

// export "router"
module.exports = router;
