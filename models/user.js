const { Schema, model, Types } = require('mongoose');

// Schema used to create User model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Please enter a valid email address!"]
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought"
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// Initialize our model
const User = model("User", userSchema);

// Gets count of friends
userSchema.virtual("friendCount").get(function() {
  return this.friends.length;
});

module.exports = User;