// Load in Express framework
const express = require(`express`);

// Load in file middlewares
const { uploadFile } = require("../middlewares/index.js");

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`);
const galaxyUpload = uploadFile("galaxies");

// Create a new Router instance and call it "router"
const router = new express.Router();

// HTML mappings
router.get("/new", galaxyCtlr.form);
router.get("/:id/edit", galaxyCtlr.form);
router.get("/:id/delete", galaxyCtlr.remove);

// RESTful resource mappings
router.get(`/`, galaxyCtlr.index);
router.post(`/`, galaxyCtlr.create, galaxyUpload);
router.get(`/:id`, galaxyCtlr.show);
router.post(`/:id`, galaxyCtlr.update, galaxyUpload);
router.delete(`/:id`, galaxyCtlr.remove);

// export "router"
module.exports = router;
