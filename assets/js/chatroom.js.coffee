chatroomId = $(chatRoomInfo).data('id')
previousMessagesQuery = '/message?where={"chatroom":'+chatroomId+'}'

# When page loaded load previous messages in that chatroom
io.socket.get previousMessagesQuery, (messages)->
  messages.forEach (message)->
    addChatMessage(message)

# When a message arrives in the chatroom channel call addChatMessage
io.socket.on "chatroom", (data)->
  if(data.verb == 'addedTo' && data.attribute == 'messages')
    io.socket.get ('/message/'+data.addedId), (message)->
      addChatMessage(message)

# Add chat message in the view
addChatMessage = (message)->
  html = new EJS({url: '/templates/index.ejs'}).render(message)
  $('.chat').append(html)

# Send message through socket
sendMessage = ()->
  chatMessage = $(chatMessageInput).val()
  io.socket.post '/message', {content: chatMessage, chatroom: chatroomId }, (data, jwres)->
    addChatMessage(data)
    $(chatMessageInput).val('')

# call sendMessage() when enter key is pressed
$(chatMessageInput).keyup (e)->
  if(e.keyCode == 13)
    sendMessage()
