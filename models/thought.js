const { Schema, model, Types } = require("mongoose");
const reactionSchema = require("./Reaction");
const moment = require("moment");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    minLength: 1,
    maxLength: 280,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
    get: (timeCreated) => moment(timeCreated).format("MMM DD, YYYY [at] hh:mm a")
  },
  username: [
    {
      type: Schema.Types.String,
      ref: "User",
      required: true
    }
  ],
  reactions: [reactionSchema]
},
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);


const Thought = model("Thought", thoughtSchema);


thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

module.exports = Thought;