import mongoose, { Schema, model, Document } from "mongoose";

// Define the Vocabulary interface
export interface IVocabulary extends Document {
  word: string;
  pronunciation: string;
  whenToSay: string;
  lesson: mongoose.Schema.Types.ObjectId; // Refers to Lesson model
  createdAt?: string;
  updatedAt?: string;
}

// Define the Vocabulary schema
const VocabularySchema = new Schema<IVocabulary>(
  {
    word: { type: String, required: true },
    pronunciation: { type: String, required: true },
    whenToSay: { type: String, required: true },
    lesson: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Format timestamps in JSON output
VocabularySchema.set("toJSON", {
  transform: (_doc, ret) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    ret.createdAt = new Date(ret.createdAt).toLocaleString("en-US", options);
    ret.updatedAt = new Date(ret.updatedAt).toLocaleString("en-US", options);

    return ret;
  },
});

// Register the model with Mongoose
const Vocabulary = mongoose.models.Vocabulary || model<IVocabulary>("Vocabulary", VocabularySchema);
export default Vocabulary;
