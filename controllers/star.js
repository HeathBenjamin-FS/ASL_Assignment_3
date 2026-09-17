const { Star, Galaxy, Planet } = require("../models");

// Show all resources
const index = async (req, res) => {
  try {
    const stars = await Star.findAll({
      include: [{ model: Galaxy }, { model: Planet }],
    });
    // Respond with an array and 2xx status code
    res.status(200).json(stars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id, {
      include: [{ model: Galaxy }, { model: Planet }],
    });

    if (!star) {
      return res.status(404).json({ message: "There is no data yet! Add something!" });
    }
    // Respond with a single object and 2xx code
    res.status(200).json(star);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    // Issue a redirect with a success 2xx code
    const { name, size, description, galaxyId } = req.body;
    const star = await Star.create({ name, size, description, galaxyId });
    res.status(201).json(star);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
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

    const star = await Star.findByPk(id);
    // Respond with a single resource and 2xx code
    res.status(200).json(star);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    await Star.destroy({
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
