const { Thought, User } = require("../models");

module.exports = {
 
  getAllThoughts(req, res) {
    Thought.find()
      .populate({
        path: "reactions",
        select: "-__v"
      })
      .select("-__v")
      .then(data => res.json(data))
      .catch((err) => {
        res.status(500).json(err)
      })
  },


  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .populate({
        path: "reactions",
        select: "-__v"
      })
      .select("-__v")
      .then(data => res.json(data))
      .catch((err) => {
        res.status(500).json(err)
      })
  },

 
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this username!' });
        }
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  },

  
  updateThoughtById(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    )
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  },

  
  deleteThought(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.id }
    )
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  },

  
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'No user found with this username!' });
        }
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  },


  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then(data => res.json(data))
      .catch((err) => {
        res.status(500).json(err)
      })
  }
};