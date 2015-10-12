/**
 * Flash message middleware
 *
 * reference http://irlnathan.github.io/sailscasts/blog/2013/08/28/building-a-sails-application-ep5-creating-a-policy-and-adding-client-side-validation/
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */

module.exports = function(req, res, next) {

  res.locals.flash = {};

  if(!req.session.flash) 
    return next();

  res.locals.flash = _.clone(req.session.flash);

  // clear session flash
  req.session.flash = {};

  next();
}
