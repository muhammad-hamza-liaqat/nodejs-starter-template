const { ValidationError } = require("yup");

const StatusCodes = require("http-status-codes");
const { sendError } = require("./responseHandler");

const catchAsyncErrors = (action) => {
  return async (req, res, next) => {
    try {
      await action(req, res, next);
    } catch (error) {
      console.error("catchAsyncErrors ==>", error);

      return sendError(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error.message || "Something went wrong",
        error.stack || {}
      );
    }
  };
};

const validationCatches = (validation) => async (req, res, next) => {
  try {
    await validation(req, res, next);
  } catch (error) {
    console.log("validationCatches errors ==>", error);

    if (error instanceof ValidationError) {
      const formattedErrors = {};

      if (Array.isArray(error.inner) && error.inner.length > 0) {
        error.inner.forEach((err) => {
          if (!formattedErrors[err.path]) {
            formattedErrors[err.path] = err.message;
          }
        });
      } else {
        formattedErrors[error.path || "general"] = error.message;
      }

      return sendError(
        res,
        StatusCodes.BAD_REQUEST,
        "Validation failed",
        formattedErrors
      );
    }

    return sendError(
      res,
      StatusCodes.BAD_REQUEST,
      "Validation failed",
      error.errors || error.message
    );
  }
};

module.exports = {
  catchAsyncErrors,
  validationCatches,
};
