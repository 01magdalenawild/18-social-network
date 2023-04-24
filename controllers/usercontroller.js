
const { User, Thought } = require('../models');


module.exports = {
  // Get all students
  getUsers(req, res) {
    User.find()
    .populate('thoughts')
      .then(user=> res.json(user))
      .catch((err) => res.status(404).json(err));
  },
  // Get a single student
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new student
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : res.json(user)
          
      )
      
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  
};
