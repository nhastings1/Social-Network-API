const { User } = require("../models");

module.exports = {
  // Get ALL users
  getAllUsers(req, res) {
    User.find()
      .select("-__v")
      .then(data => res.json(data))
      .catch((err) => {
        res.status(500).json(err)
      })
  },

  // Get user by ID
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

  // Create a new User
  createUser(req, res) {
    User.create(req.body)
      .then(data => res.json(data))
      .catch((err) => {
        res.status(500).json(err)
      })
  },

  // Add a friend
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

  // Update User
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

  // Delete User
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

  // Remove friend from list
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