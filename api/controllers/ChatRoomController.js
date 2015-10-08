/**
 * ChatRoomController
 *
 * @description :: Server-side logic for managing chatrooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function(req, res, next) {
    var params = req.params.all();
    ChatRoom.create(params, function(err, chatRoom) {

      if(err) {
        if(req.wantsJSON) {
          return res.json(err);
        } else {
          req.session.flash = {
            err: err
          }
          return res.redirect('/');
        }
      }
      req.session.flash = {};

      res.status(201);
      ChatRoom.publishCreate(chatRoom);
      //res.json(chatRoom);
      if(req.wantsJSON) {
        res.json(chatRoom);
      } else {
        res.redirect('/');
      }

    })
  },

};

