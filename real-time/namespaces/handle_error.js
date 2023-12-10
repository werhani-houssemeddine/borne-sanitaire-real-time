module.exports = (io, { message, status = 400 }) => {
  io.emit('error', {
    message: message,
    status: status
  });
}