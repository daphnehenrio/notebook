// ? Import NPM
import { Request, Response } from 'express';

// ? Import local
// | schema
import { Documents, Folders } from '../schema';
// | utils
import { 
  generateUUID,
  checkFoldersUpdate,
  addNewDocumentToFolder,
  getParentFolder,
} from '../utils';

// ? Controllers
const documentsController = {
  /**
   * @description Create a document
   * @param req Request
   * @param res Response
   * @returns Returns a document
   */
  createDocument: async (req: Request, res: Response) => {
    // | Get datas from request
    const { folderId } = req.body;

    // | If folderId check if folder exists
    if (folderId) {
      getParentFolder(folderId);
    }

    // | Create document with datas & schema
    const newDocument = new Documents({
      _id: `doc_${generateUUID()}`,
      ...req.body,
      createdAt: new Date(),
    });

    // | Save document in database
    const savedDocument = await newDocument
      .save()
      .then((response: Response) => {
        if (!response) throw new Error('Document not found');
        console.log("Saved document in database : ", response);
        return response;
      });

    if (folderId) {
      // | Update parent folder
      await addNewDocumentToFolder(folderId, savedDocument._id);
    }

    // | Return document
    res.status(200).json(savedDocument);
  },
  /**
   * @description Update a document
   * @param req Request
   * @param res Response
   * @returns Returns a document
   */
  updateDocument: async (req: Request, res: Response) => {
    // | Get datas from request
    const { id } = req.params;
    const { folderId } = req.body;

    console.log(req.body)
    
    // | Check if document exists & get it
    const document = await Documents
      .findOne({ _id: id })
      .then((response) => {
        if (!response) throw new Error('Document not found');
        return response;
      });

    // | If folderId check if parent folder exists
    if (folderId){
      getParentFolder(folderId);
    } 


    // | Update document with datas in database
    await Documents
      .updateOne({ _id: id }, {
        ...req.body,
        updatedAt: new Date(),
      });

    // | Get document updated
    const updatedDocument = await Documents
      .findOne({ _id: id })
      .then((response) => {
        if (!response) throw new Error('Document not found');
        return response;
      });

    // | Check if parent folder need to be updated
    await checkFoldersUpdate(document, updatedDocument);

    console.log("Updated document in database : ", updatedDocument);
    res.status(200).json({
      old: document,
      updated: updatedDocument,
    });
  },
};

// ? Export
export default documentsController;
