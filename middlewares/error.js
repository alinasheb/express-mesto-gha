const { isCelebrateError } = require('celebrate');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const ConflictingRequest = require('../errors/ConflictingRequest');

module.exports = (err, req, res, next) => {
  let { statusCode = 500, message } = err;
  if (statusCode === 500) {
    if (isCelebrateError(err)) {
      if (!err.details.get('body')) {
        ({ statusCode, message } = new BadRequest(err.details.get('params').message));
      } else {
        ({ statusCode, message } = new BadRequest(err.details.get('body').message));
      }
    } else if (err.name === 'CastError') {
      ({ statusCode, message } = new BadRequest('Некорректные данные'));
    } else if (err.name === 'MongoServerError' && err.code === 11000) {
      ({ statusCode, message } = new ConflictingRequest('Пользователь с таким email уже существует'));
    } else if (err.name === 'ValidationError') {
      ({ statusCode, message } = new BadRequest('Некорректные данные'));
    } else if (err.message === 'NotFound') {
      ({ statusCode, message } = new NotFound('Данные не найдены'));
    }
  }
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });

  next();
};
