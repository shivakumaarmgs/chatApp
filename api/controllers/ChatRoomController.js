/**
 * ChatRoomController
 *
 * @description :: Server-side logic for managing chatrooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function(req, res) {
    var params = req.params.all();
    ChatRoom.create(params, function(err, chatRoom) {

      // If error add errors to req.session.flash
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

      // 201 if created successfully
      res.status(201);
      ChatRoom.publishCreate(chatRoom);

      // Respond with JSON or view
      if(req.wantsJSON) {
        res.json(chatRoom);
      } else {
        res.redirect('/chatroom/'+chatRoom.roomName);
      }

    })
  },

  findOne: function(req, res) {
    var params = req.params.all();
    ChatRoom.findOne(params).exec(function (err, chatRoom) {

      // If error server 500
      if(err) {
        if(req.wantsJSON) {
          return res.json(500);
        } else {
          return res.view(500);
        }
      }

      // If chatRoom not found add flash error message
      if(!chatRoom) {
        if(req.wantsJSON) {
          return res.json({message: 'chat room not found'}, 404);
        } else {
          req.session.flash = {
            err: {message: 'chat room not found'}
          }
          return res.redirect('/');
        }
      }

      Message.find().exec(function (err, messages) {
        // If error server 500
        if(err) {
          if(req.wantsJSON) {
            return res.json(500);
          } else {
            return res.view(500);
          }
        }

        // Subscribe client to this specific chat room
        if(req.isSocket)
          ChatRoom.subscribe(req.socket, chatRoom);

        // Clear req.session.flash if no error
        req.session.flash = {};

        res.status(200);

        // Respond with JSON or view
        if(req.wantsJSON) {
          res.json(chatRoom);
        } else {
          res.view('chatroom/findOne', { chatRoom: chatRoom, messages: messages });
        }
      })

    })
  },

};

