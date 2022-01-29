const { Schema, model } = require("mongoose");

const characterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
},
{
  toJSON: {
    virtuals: true,
  },
});

characterSchema.virtual("featuring", {
  ref: "Featuring",
  localField: "_id",
  foreignField: "characterId"
});

const Character = model("Character", characterSchema);

module.exports = Character;
