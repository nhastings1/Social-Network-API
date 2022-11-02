const { User } = require("../models");

module.exports = {
 
  getAllUsers(req, res) {
    User.find()
      .select("-__v")
      .then(data => res.json(data))
      .catch((err) => {
        res.status(500).json(err)
      })
  },

  
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate({
        path: "thoughts",
        select: "-__v"
      })
      .populate({
        path: "friends",
        select: "-__v"
      })
      .select("-__v")
      .then(data => res.json(data))
      .catch((err) => {
        res.status(500).json(err)
      })
  },

  
  createUser(req, res) {
    User.create(req.body)
      .then(data => res.json(data))
      .catch((err) => {
        res.status(500).json(err)
      })
  },

  
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .then(data => {
        if (!data) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  },

 
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: "No user found with this ID!" });
          return;
        }
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  },

 
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: "No user found with with this ID!" });
          return;
        }
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  },


  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then(data => res.json(data))
      .catch((err) => {
        res.status(500).json(err)
      })
  }
};