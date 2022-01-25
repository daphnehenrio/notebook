// ? Import NPM
import { Request, Response } from 'express';

// ? Import local
// | schema
import { Documents } from '../../schema';
// | utils
import { generateUUID } from '../../utils/uuid';

// ? Controllers
const documentsControllers = {
  /**
   * @description Get all documents
   * @param req Request
   * @param res Response
   * @returns Returns a list of documents
   */
  getDocuments: async (req: Request, res: Response) => {
    await Documents
      .find({}).sort({ createdAt: -1 })
      .then((response) => {
        res.status(200).json(response);
      });
  },
  /**
   * @description Get a document
   * @param req Request
   * @param res Response
   * @returns Returns a document
   */
  getDocument: async (req: Request, res: Response) => {
    await Documents
      .findOne({ _id: req.params.id })
      .then((response) => {
        if (!response) throw new Error('Document not found');
        res.status(200).json(response);
      });
  },
  /**
   * @description Create a document
   * @param req Request
   * @param res Response
   * @returns Returns a document
   */
  createDocument: async (req: Request, res: Response) => {
    const { title,content, folderId, labelsId, cratedBy } = req.body;

    const newDocument = new Documents({
      _id: `doc_${generateUUID()}`,
      title,
      content,
      folderId,
      labelsId,
      cratedBy,
      createdAt: new Date(),
    });

    await newDocument
      .save()
      .then((response: Response) => {
        res.status(200).json(response);
      });
  },
  /**
   * @description Update a document
   * @param req Request
   * @param res Response
   * @returns Returns a document
   */
  updateDocument: async (req: Request, res: Response) => {
    const { _id } = req.params;
    const { name, folderId, labelsId } = req.body;

    const document = await Documents
      .findOneAndUpdate({ _id }, { 
        name,
        folderId,
        labelsId,
        updatedAt: new Date(),
      })
      .then((response) => {
        if (!response) throw new Error('Document not found');
        return response;
      });

      await Documents
        .findOne({ _id })
        .then((response) => {
          if (!response) throw new Error('Document not found');
          res.status(200).json({
            old: document,
            updated: response,
        });
        });
  },
  /**
   * @description Delete a document
   * @param req Request
   * @param res Response
   * @returns Returns a document
   */
  deleteDocument: async (req: Request, res: Response) => {
    await Documents
      .findOneAndDelete({ _id: req.params.id })
      .then((response) => {
        if (!response) throw new Error('Document not found');
        res.status(200).json(response);
      });
  },
};

// ? Export
export default documentsControllers;
