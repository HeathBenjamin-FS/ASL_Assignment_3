const { Galaxy, Star } = require("../models");

// Show all resources
const index = async (req, res) => {
  // Respond with an array and 2xx status code
  const galaxies = await Galaxy.findAll({
    include: [{ model: Star }],
  });
  res.status(200).json(galaxies);
};

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code

  const galaxy = await Galaxy.findByPk(req.params.id, {
    include: [{ model: Star }],
  });
  res.status(200).json(galaxy);
};

// Create a new resource
const create = async (req, res) => {
  // Issue a redirect with a success 2xx code
  const { name, size, description } = req.body;
  await Galaxy.create({ name, size, description });
  res.redirect(`/galaxies`, 201);
};

// Update an existing resource
const update = async (req, res) => {
  const id = req.params.id;
  const { name, size, description } = req.body;
  await Galaxy.update(
    { name, size, description },
    {
      where: { id },
    },
  );

  const galaxy = Galaxy.findByPk(id);
  // Respond with a single resource and 2xx code
  res.status(200).json(galaxy);
};

// Remove a single resource
const remove = async (req, res) => {
  const id = req.params.id;
  await Galaxy.destroy({
    where: { id },
  });

  // Respond with a 2xx status code and bool
  res.status(204).json(true);
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
