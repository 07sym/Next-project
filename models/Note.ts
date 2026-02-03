import mongoose, { Schema, models } from "mongoose";

const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: String,
  },
  { timestamps: true }
);

export default models.Note || mongoose.model("Note", NoteSchema);
