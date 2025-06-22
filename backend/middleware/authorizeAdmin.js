module.exports = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next(); // Proceed if admin
  }
  return res.status(403).json({ message: 'Access denied. Admins only.' });
};
