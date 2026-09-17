const { Planet, Star } = require("../models");

// Show all resources
const index = async (req, res) => {
  try {
    const planets = await Planet.findAll({
      include: [{ model: Star }],
    });
    // Respond with an array and 2xx status code
    res.status(200).json(planets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id, {
      include: [
        {
          model: Star,
        },
      ],
    });

    if (!planet) {
      return res.status(404).json({ message: "There is no data yet! Add something!" });
    }

    // Respond with a single object and 2xx code
    res.status(200).json(planet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const { name, size, description } = req.body;
    await Planet.create({ name, size, description });

    // Issue a redirect with a success 2xx code
    res.redirect(201, `/planets`);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, size, description } = req.body;
    await Planet.update(
      { name, size, description },
      {
        where: { id },
      },
    );

    const planet = await Planet.findByPk(id);

    // Respond with a single resource and 2xx code
    res.status(200).json(planet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    await Planet.destroy({
      where: { id },
    });
    // Respond with a 2xx status code and bool
    res.status(204).json(true);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
