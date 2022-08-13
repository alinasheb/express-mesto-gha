const User = require('../models/user');

// получить всех пользователей
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// получить пользователя по id
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'Error') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

// создание пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

// обновление пользователя
const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err.name === 'Error') {
        return res.status(400).send({ message: 'Некорректный id' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

// обновление аватара
const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err.name === 'Error') {
        return res.status(400).send({ message: 'Некорректные данные' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
