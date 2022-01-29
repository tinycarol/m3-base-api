const { Schema, model, SchemaTypes } = require("mongoose");

const featuringSchema = new Schema(
  {
    bookId: {
      type: SchemaTypes.ObjectId,
      ref: "Book",
      required: true,
    },
    characterId: {
      type: SchemaTypes.ObjectId,
      ref: "Character",
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

featuringSchema.virtual("character", {
  ref: "Character",
  localField: "characterId",
  foreignField: "_id",
  justOne: true,
});

featuringSchema.virtual("book", {
  ref: "Book",
  localField: "bookId",
  foreignField: "_id",
  justOne: true,
});

const Featuring = model("Featuring", featuringSchema);

module.exports = Featuring;
