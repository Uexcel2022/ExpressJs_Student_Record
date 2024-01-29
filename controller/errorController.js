const CustomError = require("./../utils/customError");

const castErrorHandler = (error) => {
  const msg = `The ${error.path} : ${error.value} is invalid! `;
  return new CustomError(msg, 400);
};

const validatorErrorHandler = (error) => {
  const errors = Object.values(error.errors).map((val) => val.message);
  const msg = `Invalid inputs: ${errors.join(". ")} `;
  return new CustomError(msg, 400);
};

const uniqueValueErrorHandler = (error) => {
  let msg;
  if (error.keyValue.matricNumber) {
    msg = `This matricNumber: ${error.keyValue.matricNumber} has been used by someone else. Please consult the school... `;
  }

  if (error.keyValue.phone) {
    msg = `This phone number: ${error.keyValue.phone} has been used by someone else. Please consult the school... `;
  }

  if (error.keyValue.email) {
    msg = `This email address: ${error.keyValue.email} has been used by someone else. Please consult the school... `;
  }

  return new CustomError(msg, 400);
};

module.exports = (error, req, resp, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  if (process.env.NODE_ENV == "development") {
    devErrors(resp, error);
  } else if (process.env.NODE_ENV == "production") {
    if (error.name == "CastError") {
      error = castErrorHandler(error);
    }

    if (error.name == "ValidationError") {
      error = validatorErrorHandler(error);
    }

    if (error.code == 11000) {
      error = uniqueValueErrorHandler(error);
    }
    prodErrors(resp, error);
  }
};

function devErrors(resp, error) {
  resp.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
}

function prodErrors(resp, error) {
  if (error.isOperational) {
    return resp.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }
  resp.status(500).json({
    status: 500,
    message: "Something went wrong... Please try again later",
  });
}
