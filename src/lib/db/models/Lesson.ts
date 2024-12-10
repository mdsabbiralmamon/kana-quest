import mongoose, { Schema, model, Document } from "mongoose";

// Define the Lesson interface
export interface ILesson extends Document {
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

// Define the Lesson schema
const LessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Format timestamps in JSON output
LessonSchema.set("toJSON", {
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
const Lesson = mongoose.models.Lesson || model<ILesson>("Lesson", LessonSchema);
export default Lesson;
