// ? Import npm
import { model, Schema } from 'mongoose';

// Define a schema
const labelsSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
    },
  },
);

// ? Export
export default model('Labels', labelsSchema);
