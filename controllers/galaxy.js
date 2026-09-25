const { Galaxy, Star } = require("../models");

// Show all resources
const index = async (req, res) => {
  // try {
  //   // Respond with an array and 2xx status code
  //   const galaxies = await Galaxy.findAll({
  //     include: [{ model: Star }],
  //   });

  //   res.status(200).json(galaxies);
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }

  const galaxies = await Galaxy.findAll();
  if (req.headers["content-type"] === "application/json" || req.accepts("html", "json") === "json") {
    return res.status(200).json(galaxies);
  }
  res.render("galaxy/index.twig", { galaxies });
};

// Show resource
const show = async (req, res) => {
  // try {
  //   // Respond with a single object and 2xx code

  //   const galaxy = await Galaxy.findByPk(req.params.id, {
  //     include: [{ model: Star }],
  //   });

  //   if (!galaxy) {
  //     return res.status(404).json({ message: "There is no data yet! Add something!" });
  //   }

  //   res.status(200).json(galaxy);
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }

  const galaxy = await Galaxy.findByPk(req.params.id);
  if (!galaxy) {
    if (req.headers["content-type"] === "application/json") {
      return res.status(404).json({ error: "Galaxy not found" });
    }
    return res.status(404).send("Galaxy not found.");
  }

  if (req.headers["content-type"] === "application/json") {
    res.status(200).json(galaxy);
  }
  res.render("galaxy/show.twig", { galaxy });
};

// Create a new resource
const create = async (req, res, next) => {
  // try {
  //   // Issue a redirect with a success 2xx code
  //   const { name, size, description } = req.body;
  //   await Galaxy.create({ name, size, description });
  //   res.redirect(201, `/galaxies`);
  // } catch (error) {
  //   res.status(400).json({ message: error.message });
  // }

  const galaxy = await Galaxy.create(req.body);

  if (req.headers["content-type"] === "application/json" || req.accepts("html", "json") === "json") {
    return res.status(201).json(galaxy);
  }
  req.resourceId = galaxy.id;
  if (next) await next();
  res.redirect(302, `/galaxies/${galaxy.id}`);
};

// Update an existing resource
const update = async (req, res, next) => {
  // try {
  //   const id = req.params.id;
  //   const { name, size, description } = req.body;
  //   await Galaxy.update(
  //     { name, size, description },
  //     {
  //       where: { id },
  //     },
  //   );

  //   const galaxy = await Galaxy.findByPk(id);
  //   // Respond with a single resource and 2xx code
  //   res.status(200).json(galaxy);
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }

  const id = req.params.id;

  await Galaxy.update(req.body, {
    where: { id },
  });

  if (req.headers["content-type"] === "application/json") {
    const updatedGalaxy = await Galaxy.findByPk(id);
    return res.status(200).json(updatedGalaxy);
  }
  req.resourceId = id;

  if (next) {
    await next();
  }
  if (!res.headersSent) {
    res.redirect(302, `/galaxies/${id}`);
  }
};

// Remove a single resource
const remove = async (req, res) => {
  // try {
  //   const galaxy = await Galaxy.findByPk(req.params.id);
  //   if (!galaxy) {
  //     return res.staus(404).json({ message: "Galaxy not found to be deleted!" });
  //   }
  //   await galaxy.destroy();

  //   // Respond with a 2xx status code and bool
  //   res.status(204).send();
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }

  await Galaxy.destroy({
    where: { id: req.params.id },
  });
  if (req.headers["content-type"] === "application/json" || req.accepts("html", "json") === "json") {
    return res.status(204).send();
  }
  res.redirect(302, `/galaxies`);
};

const form = async (req, res) => {
  if (typeof req.params.id !== "undefined") {
    const galaxy = await Galaxy.findByPk(req.params.id);
    res.render("galaxy/edit.twig", { galaxy });
  } else {
    res.render("galaxy/create.twig");
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove, form };
