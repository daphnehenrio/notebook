// ? Import npm
import { model, Schema, Types } from 'mongoose';

// Define a schema
const foldersSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    root: {
      type: Boolean,
    },
    level: {
      type: Number,
    },
    parentId: {
      type: String,
    },
    childrensId: [{
      type: String,
    }],
    documentsId: [{
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
export default model('Folders', foldersSchema);
