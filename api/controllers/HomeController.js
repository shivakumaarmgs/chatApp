/**
 * HomeContoller
 *
 * @description :: Static page like landing page and so on
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req, res) {
    res.locals.flash = _.clone(req.session.flash);
    req.session.flash = {};
    res.view();
  }

};
