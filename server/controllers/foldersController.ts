// ? Import NPM
import { Request, Response } from 'express';

// ? Import local
// | schema
import { Folders } from '../schema';
// | utils
import { generateUUID } from '../utils/uuid';

// ? Functions utils
const getParentFolder = async (parentId: String) => {
  return Folders
    .findOne({ _id: parentId })
    .then((response) => {
      if (!response) throw new Error('Parent folder not found');
      return response;
    });
}

// ? Controllers
const foldersControllers = {
  /**
   * @description Create a folder
   * @param req Request
   * @param res Response
   * @returns Returns a folder
   */
  createFolder: async (req: Request, res: Response) => {
    // | Get datas from request
    const { name, parentId, cratedBy } = req.body;

    // | Check if parent folder & if parent folder exists & get it
    const parentFolder = parentId ? await getParentFolder(parentId) : null;

    // | Create folder with datas & schema
    const newFolder = new Folders({
      _id: `fold_${generateUUID()}`,
      name,
      root: parentFolder ? false : true,
      level: parentFolder ? parentFolder.level + 1 : 0,
      parentId,
      cratedBy,
      createdAt: new Date(),
    });

    // | Save folder in database
    await newFolder
      .save()
      .then((response: Response) => {
        res.status(200).json(response);
      });
  },
  /**
   * @description Update a folder
   * @param req Request
   * @param res Response
   * @returns Returns a folder
   */
  updateFolder: async (req: Request, res: Response) => {
    // | Get datas from request
    const { id } = req.params;
    const { name, parentId, childrensId, documentsId } = req.body;
    
    // | Check if folder exists & get it
    const folder = await Folders
      .findOne({ _id: id })
      .then((response) => {
        if (!response) throw new Error('Folder not found');
        return response;
      });

    // | Check if parent folder & if parent folder exists & get it
    const parentFolder = parentId ? await getParentFolder(parentId) : null;

    // | Set level according to the position of the folder in the tree structure 
    const level = parentFolder 
      ? parentFolder.level + 1 
      : parentId === null 
        ? 0 
        : folder.level;

    // | Update folder with datas in database
    await Folders
      .updateOne({ _id: id }, {
        name,
        parentId,
        level,
        childrensId,
        documentsId,
        root: parentFolder ? false : true,
        updatedAt: new Date(),
      });

    // | Get folder updated and return folder before and after update
    await Folders
      .findOne({ _id: id })
      .then((response) => {
        res.status(200).json({
          old: folder,
          updated: response,
        });
      });
  },

};

// ? Export
export default foldersControllers;
