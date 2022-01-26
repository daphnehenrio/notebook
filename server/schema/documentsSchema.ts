// ? Import npm
import { model, Schema } from 'mongoose';

// ? Shema definition
const documentsSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    folderId: {
      type: String,
    },
    labelsIds: [{
      type: String,
    }],
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
export default model('Documents', documentsSchema);
