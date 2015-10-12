chatroomId = $(chatRoomInfo).data('chatroom-id')
userId = $(chatRoomInfo).data('user-id')

previousMessagesQuery = '/message?where={"chatroom":'+chatroomId+'}'

# When page loaded load previous messages in that chatroom
io.socket.get previousMessagesQuery, (messages)->
  messages.forEach (message)->
    addChatMessage(message)
  scrollToEndOfChatWindow()

# Send message through socket
sendMessage = ()->
  chatMessage = $(chatMessageInput).val()
  io.socket.post '/message',
    {
      content: chatMessage,
      chatroom: chatroomId,
      sender: userId
    },
    (data, jwres)->
      addChatMessage(data)
      $(chatMessageInput).val('')
      scrollToEndOfChatWindow()

# When a message arrives in the chatroom channel call addChatMessage
io.socket.on "chatroom", (data)->
  if(data.verb == 'addedTo' && data.attribute == 'messages')
    io.socket.get ('/message/'+data.addedId), (message)->
      addChatMessage(message)
      scrollToEndOfChatWindow()

# Add chat message in the view
addChatMessage = (message)->
  if(message.sender == userId)
    html = new EJS({url: '/templates/message/currentUserMessage.ejs'}).render(message)
  else
    html = new EJS({url: '/templates/message/otherUserMessage.ejs'}).render(message)
  $('.chat').append(html)

# call sendMessage() when enter key is pressed
$(chatMessageInput).keyup (e)->
  if(e.keyCode == 13)
    sendMessage()

scrollToEndOfChatWindow = (message)->
  $(chatWindow).animate
    scrollTop: $(chatWindow)[0].scrollHeight
