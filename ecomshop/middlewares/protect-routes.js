//? protecting routes like the admin
//for one to be forced to signup or login

function protectRoutes(req, res, next) {
  // checking if one is authenticated
  if (!res.locals.isAuth) {
    return res.redirect("/401");
  }

  //checking if one is the admin
  if (req.path.startsWith("/admin") && !res.locals.isAdmin) {
    return res.redirect("/403");
  }

  next();
}

//export
module.exports = protectRoutes;
