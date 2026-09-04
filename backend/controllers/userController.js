const crypto = require('crypto');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');

const hashPassword = (password) => crypto.scryptSync(password, 'campus-capstone', 64).toString('hex');

exports.getUsers = asyncHandler(async (req, res) => res.json({ success: true, data: await User.getAll() }));
exports.register = asyncHandler(async (req, res) => {
  const { full_name, email, password, role } = req.body;
  if (!full_name || !email || !password || !['Student', 'Project Lead', 'Faculty Advisor', 'Admin'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Full name, email, password, and a valid role are required.' });
  }
  if (await User.getByEmail(email)) return res.status(409).json({ success: false, message: 'This email is already registered.' });
  const user = await User.create({ full_name, email, password_hash: hashPassword(password), role });
  res.status(201).json({ success: true, data: user });
});
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.getByEmail(email);
  if (!user || user.status !== 'Active' || user.password_hash !== hashPassword(password)) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }
  const { password_hash, ...safeUser } = user;
  res.json({ success: true, data: safeUser });
});
exports.updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['Active', 'Inactive'].includes(status)) return res.status(400).json({ success: false, message: 'Status must be Active or Inactive.' });
  const user = await User.updateStatus(req.params.id, status);
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
  res.json({ success: true, data: user });
});
