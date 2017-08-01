export default (req, res, next) => {
  if (req.isAdmin) {
    next();
  } else {
    res.json({ error: true, message: "Not admin permission" });
  }
};
