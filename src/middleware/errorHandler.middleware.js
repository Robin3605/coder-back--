
const logError = (err, req, statusCode) => {
  const errorDetails = {
    timestamp: new Date().toISOString(),
    path: `[${req.method}] ${req.originalUrl}`,
    statusCode,
    message: err.message,
    stack: err.stack,
    body: req.body,
    params: req.params,
    query: req.query,
  };

  console.error("Error Handler:", errorDetails);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let errorMessage = err.message || "Error interno del servidor";

  // Comprobar el tipo de error
  if (err instanceof SyntaxError) {
    statusCode = 400;
    errorMessage = "Bad Request";
  } else if (err instanceof TypeError) {
    statusCode = 401;
    errorMessage = "Unauthorized";
  } else if (err instanceof RangeError) {
    statusCode = 403;
    errorMessage = "Forbidden";
  } else if (err instanceof ReferenceError) {
    statusCode = 404;
    errorMessage = "Not Found";
  } else if (err instanceof Error) {
    statusCode = 422;
    errorMessage = "Unprocessable Entity";
  }

  logError(err, req, statusCode);
  res.status(statusCode).json({ error: errorMessage });
};
