const { Planet, Star } = require("../models");

// Show all resources
const index = async (req, res) => {
  const planets = await Planet.findAll({
    include: [{ model: Star }],
  });
  // Respond with an array and 2xx status code
  res.status(200).json(planets);
};

// Show resource
const show = async (req, res) => {
  const planet = await Planet.findByPk(req.params.id, {
    include: [
      {
        model: Star,
      },
    ],
  });

  // Respond with a single object and 2xx code
  res.status(200).json(planet);
};

// Create a new resource
const create = async (req, res) => {
  const { name, size, description } = req.body;
  await Planet.create({ name, size, description });

  // Issue a redirect with a success 2xx code
  res.redirect(`/planets`, 201);
};

// Update an existing resource
const update = async (req, res) => {
  const id = req.params.id;
  const { name, size, description } = req.body;
  await Planet.update(
    { name, size, description },
    {
      where: { id },
    },
  );

  const planet = Planet.findByPk(id);

  // Respond with a single resource and 2xx code
  res.status(200).json(planet);
};

// Remove a single resource
const remove = async (req, res) => {
  const id = req.params.id;
  await Planet.destroy({
    where: { id },
  });
  // Respond with a 2xx status code and bool
  res.status(204).json(true);
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
