/**
* ChatRoom.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    roomName: {
      type: 'string',
      required: true,
      unique: true
    },

    messages: {
      collection: 'message',
      via: 'chatroom'
    }

  }

};

