const path = require("path");

const uploadFile = (resourceFolder, Model) => {
  return async (req, res, next) => {
    if (!req.resourceId || !req.files || !req.files.image) {
      return next ? next() : undefined;
    }

    const file = req.files.image;
    const extension = path.extname(file.name);

    const uploadPath = path.join(__dirname, `../public/uploads/${resourceFolder}/${req.resourceId}${extension}`);

    try {
      await file.mv(uploadPath);
    } catch (error) {
      console.error("File upload error:", error);
    }

    if (next) next();
  };
};

module.exports = { uploadFile };
