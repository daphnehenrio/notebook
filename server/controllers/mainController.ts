// ? Import NPM
import { Request, Response } from 'express';

// ? Import local
// | schemas
import { Labels, Documents, Folders } from '../schema';
// | utils
import { generateUUID } from '../utils/uuid';

// ? Functions utils
const getModel = (modelName: String) => {
  switch (modelName) {
  case "documents":
    return Documents;
  case "folders":
    return Folders;
  case "labels":
    return Labels;
  default:
    throw new Error('Model not found');
  }
};

const generateId = (modelName: String) => {
  switch (modelName) {
    case "documents":
      return `doc_${generateUUID()}`;
    case "folders":
      return `fol_${generateUUID()}`;
    case "labels":
      return `lab_${generateUUID()}`;
    default:
      throw new Error(`Model ${modelName} not found`);
  }
};

// ? Controllers
const mainController = {
  /**
   * @description Get all documents of a model
   * @param req Request
   * @param res Response
   * @returns Returns a list of all documents of a model
   */
  getAll: async (req: Request, res: Response) => {
    // | Get datas from request to get model
    const modelName = req.params.class;

    // | Get model and get all documents from it and send it
    await getModel(modelName)
      .find({}).sort({ createdAt: -1 })
      .then((response) => {
        res.status(200).json(response);
      });
  },
  /**
   * @description Get one document of a model
   * @param req Request
   * @param res Response
   * @returns Returns a document of a model
   */
  getOne: async (req: Request, res: Response,) => {
    // | Get datas from request to get model
    const modelName = req.params.class;

    // | Get model and get one document from it by id and return it
    await getModel(modelName)
      .findOne({ _id: req.params.id })
      .then((response) => {
        if (!response) throw new Error(`${modelName} not found`);
        res.status(200).json(response);
      });
  },
  /**
   * @description Create document of a model
   * @param req Request
   * @param res Response
   * @returns Returns document created of a model
   */
  createOne: async (req: Request, res: Response,) => {
    // | Get datas from request to get model
    const modelName = req.params.class;

    // | Get model
    const Model = getModel(modelName);

    // | Create document with datas & schema
    const newData = new Model({
      _id: generateId(modelName),
      ...req.body,
      createdAt: new Date(),
    });

    // | Save document in database and return it
    await newData
      .save()
      .then((response: Response) => {
        res.status(200).json(response);
      });
  },
  /**
   * @description Update document of a model
   * @param req Request
   * @param res Response
   * @returns Returns old and updated document of a model
   */
  updateOne: async (req: Request, res: Response,) => {
    // | Get datas from request to get model
    const modelName = req.params.class;

    // | Get model and update one document from it by id & save previous datas
    const data = await getModel(modelName)
      .findOneAndUpdate({ _id: req.params.id }, {
        ...req.body,
        updatedAt: new Date(),
      })
      .then((response: Response) => {
        if (!response) throw new Error(`${modelName} not found`);
        return response;
      });

      // | Get updated document and return document before and after update
      await getModel(modelName)
        .findOne({ _id: req.params.id })
        .then((response) => {
          if (!response) throw new Error(`${modelName} not found`);
          res.status(200).json({
            old: data,
            updated: response
          });
        });
  },
  /**
   * @description Delete a document of a model
   * @param req Request
   * @param res Response
   * @returns Returns a deleted document of a model
   */
  deleteOne: async (req: Request, res: Response,) => {
    // | Get datas from request to get model
    const modelName = req.params.class;

    // | Get model and delete one document from it by id & return deleted document
    await getModel(modelName)
      .findOneAndDelete({ _id: req.params.id })
      .then((response: Response) => {
        if (!response) throw new Error(`${modelName} not found`);
        res.status(200).json(response);
      });
  },
};

// ? Export
export default mainController;