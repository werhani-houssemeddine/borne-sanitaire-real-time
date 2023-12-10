module.exports = (socket, { message, status = 400 }) => {
  try {
    socket.send(JSON.stringify({
        error: true,
        message: message,
        status: status
      })
    );

  } catch (error) {
    console.log('error sending the error message', error);
  }
}