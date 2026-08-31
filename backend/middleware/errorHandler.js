// Sends consistent JSON errors instead of exposing server details to users.
function notFound(req, res) {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} was not found.` });
}

function errorHandler(error, req, res, next) {
  console.error(error);
  res.status(error.statusCode || 500).json({ success: false, message: error.message || 'Something went wrong on the server.' });
}

module.exports = { notFound, errorHandler };
