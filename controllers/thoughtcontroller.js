const { User, Thought } = require('../models');


module.exports = {
  // Get all students
  getThoughts(req, res) {
    Thought.find()
      .then(thought=> res.json(thought))
      .catch((err) => res.status(404).json(err));
  },
  // Get a single student
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
              thought
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new student
  async createThought(req, res) {
    Thought.create(req.body)
    
      .then(async(thought) => {
       const user =await User.findOneAndUpdate({_id:req.body.userId},{$push:{thoughts:thought._id}},{new: true})
       res.json({user: user,thought: thought})})
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thought exists' })
          : res.json(thought)
          
      )
      
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  
};
