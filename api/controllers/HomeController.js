/**
 * HomeContoller
 *
 * @description :: Static page like landing page and so on
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req, res) {
    if(req.session.flash) {
      console.log('Session flash not empty');
      console.log(req.session.flash);
      res.locals.flash = _.clone(req.session.flash);
    } else {
      console.log('Session flash empty');
      res.locals.flash = false;
    }
    req.session.flash = {};
    res.view();
  }

};
