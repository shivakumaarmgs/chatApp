console.log 'This line is printed'

joinRoom = (event)->
  console.log 'This is clicked ' + event
  event.preventDefault()
  window.location.href = '/chatroom/' + $('input[name="roomName"]').val()
  #roomName = $('input[name="roomName"]').val()


