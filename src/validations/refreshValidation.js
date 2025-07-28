const yup = require("yup");

const refreshValidation = (req, res, next) => {
  const schema = yup
    .object({
      refreshToken: yup.string().required("refreshToken is required"),
    })
    .noUnknown(true, "[refreshToken] is allowed only");

  schema.validateSync(req.body, {
    abortEarly: true,
    strict: true,
  });

  next();
};

module.exports = refreshValidation;
