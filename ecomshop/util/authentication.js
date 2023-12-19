//authenticating user to login

//creating userseeion
function createUserSession(req, user, action) {
  req.session.uid = user._id.toString();
  req.session.save(action); //saving the session
}

//deleting user data from a session
function destroyUserAuthSession(req) {
  req.session.uid = null;
}

module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession,
};
