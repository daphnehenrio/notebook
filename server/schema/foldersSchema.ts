// ? Import npm
import { model, Schema, Types } from 'mongoose';

// ? Shema definition
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
      required: true,
    },
    level: {
      type: Number,
      required: true,
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
