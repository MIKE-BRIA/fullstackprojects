//middleware to check if user is authenticated to login

function checkAuthStatus(req, res, next) {
  const uid = req.session.uid;

  if (!uid) {
    return next();
  }

  res.locals.uid = uid;
  res.locals.isAuth = true;
  next();
}

module.exports = checkAuthStatus;
