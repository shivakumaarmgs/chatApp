console.log 'This line is printed'

joinRoom = (event)->
  console.log 'This is clicked ' + event
  event.preventDefault()
  if $(roomName).val() == ''
    $(roomNameDiv).addClass('has-error')
  else
    window.location.href = '/chatroom/' + $(roomName).val()
