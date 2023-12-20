// *saving user input fields in session during signup and login process

function getSessionData(req) {
  const sessionData = req.session.flashedData;

  req.session.flashedData = null;

  return sessionData;
}

// saving session data
function flashDataToSession(req, data, action) {
  req.session.flashedData = data;
  Request.session.save(action);
}

module.exports = {
  getSessionData: getSessionData,
  flashDataToSession: flashDataToSession,
};
