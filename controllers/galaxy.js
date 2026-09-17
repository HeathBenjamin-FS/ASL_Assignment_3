const { Galaxy, Star } = require("../models");

// Show all resources
const index = async (req, res) => {
  try {
    // Respond with an array and 2xx status code
    const galaxies = await Galaxy.findAll({
      include: [{ model: Star }],
    });

    res.status(200).json(galaxies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Show resource
const show = async (req, res) => {
  try {
    // Respond with a single object and 2xx code

    const galaxy = await Galaxy.findByPk(req.params.id, {
      include: [{ model: Star }],
    });

    if (!galaxy) {
      return res.status(404).json({ message: "There is no data yet! Add something!" });
    }

    res.status(200).json(galaxy);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    // Issue a redirect with a success 2xx code
    const { name, size, description } = req.body;
    await Galaxy.create({ name, size, description });
    res.redirect(201, `/galaxies`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, size, description } = req.body;
    await Galaxy.update(
      { name, size, description },
      {
        where: { id },
      },
    );

    const galaxy = await Galaxy.findByPk(id);
    // Respond with a single resource and 2xx code
    res.status(200).json(galaxy);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (!galaxy) {
      return res.staus(404).json({ message: "Galaxy not found to be deleted!" });
    }
    await galaxy.destroy();

    // Respond with a 2xx status code and bool
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
