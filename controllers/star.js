const { Star, Galaxy, Planet } = require("../models");

// Show all resources
const index = async (req, res) => {
  const stars = await Star.findAll({
    include: [{ model: Galaxy }, { model: Planet }],
  });
  // Respond with an array and 2xx status code
  res.status(200).json(stars);
};

// Show resource
const show = async (req, res) => {
  const star = await Star.findByPk(req.params.id, {
    include: [{ model: Galaxy }, { model: Planet }],
  });
  // Respond with a single object and 2xx code
  res.status(200).json(star);
};

// Create a new resource
const create = async (req, res) => {
  // Issue a redirect with a success 2xx code
  const { name, size, description, galaxyId } = req.body;
  await Star.create({ name, size, description, galaxyId });
  res.redirect(`/stars`, 201);
};

// Update an existing resource
const update = async (req, res) => {
  const id = req.params.id;
  const { name, size, description, galaxyId } = req.body;

  await Star.update(
    {
      name,
      size,
      description,
      galaxyId,
    },
    {
      where: { id },
    },
  );

  const star = Star.findByPk(id);
  // Respond with a single resource and 2xx code
  res.status(200).json(star);
};

// Remove a single resource
const remove = async (req, res) => {
  const id = req.params.id;
  await Star.destroy({
    where: { id },
  });
  // Respond with a 2xx status code and bool
  res.status(204).json(true);
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
