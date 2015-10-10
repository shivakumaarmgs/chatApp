chatroomId = $(chatRoomInfo).data('id')
previousMessagesQuery = '/message?where={"chatroom":'+chatroomId+'}'

io.socket.get previousMessagesQuery, (messages)->
  messages.forEach (message)->
    addChatMessage(message)

io.socket.on "chatroom", (data)->
  if(data.verb == 'addedTo' && data.attribute == 'messages')
    io.socket.get ('/message/'+data.addedId), (message)->
      addChatMessage(message)

addChatMessage = (message)->
  html = new EJS({url: '/templates/index.ejs'}).render(message)
  $('.chat').append(html)

sendMessage = (message)->
  chatMessage = $(chatMessageInput).val()
  io.socket.post '/message', {content: chatMessage, chatroom: chatroomId }, (data, jwres)->
    addChatMessage(data)
    $(chatMessageInput).val('')
