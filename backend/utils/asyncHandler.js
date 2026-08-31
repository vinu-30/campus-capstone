// Avoids repeating try/catch in every asynchronous controller function.
const asyncHandler = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
module.exports = asyncHandler;
