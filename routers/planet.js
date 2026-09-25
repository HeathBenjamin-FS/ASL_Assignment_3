// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const planetCtlr = require(`../controllers/planet.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// HTML mappings
router.get("/new", planetCtlr.form);
router.get("/:id/edit", planetCtlr.form);
router.get("/:id/delete", planetCtlr.remove);

// RESTful resource mappings
router.get(`/`, planetCtlr.index);
router.post(`/`, planetCtlr.create);
router.get(`/:id`, planetCtlr.show);
router.post(`/:id`, planetCtlr.update);
router.delete(`/:id`, planetCtlr.remove);

// export "router"
module.exports = router;
