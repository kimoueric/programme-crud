module.exports = function (request, response, next) {
  if (request.session.flash) {
    response.locals.typeErreur = request.session.flash;
    request.session.flash = undefined;
  }
  request.flash = function (type, contenu) {
    if (request.session.flash === undefined) {
      request.session.flash = {};
    }

    request.session.flash[type] = contenu;
  };

  next();
};
