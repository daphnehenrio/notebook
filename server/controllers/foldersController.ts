// ? Import NPM
import {
  Request,
  Response
} from 'express';

// ? Import local
// | schema
import {
  Folders
} from '../schema';
// | utils
import {
  generateUUID,
  checkDataConcordance,
  compareDatasToPropagateUpdate,
  addNewChildren,
} from '../utils';

// ? Functions utils
const getParentFolder = async (parentId: String) => {
  return Folders
    .findOne({
      _id: parentId
    })
    .then((response) => {
      if (!response) throw new Error('Parent folder not found');
      return response;
    });
}


// ? Controllers
const foldersController = {
  /**
   * @description Create a folder
   * @param req Request
   * @param res Response
   * @returns Returns a folder
   */
  createFolder: async (req: Request, res: Response) => {
    let result;
    let otherUpdate;

    // | Get datas from request
    const {
      name,
      parentId,
      childrensId
    } = req.body;

    // | Check data concordance
    checkDataConcordance(undefined, childrensId, parentId);

    // | Check if parent folder & if parent folder exists & get it
    const parentFolder = parentId ? await getParentFolder(parentId) : null;

    // | Create folder with datas & schema
    const newFolder = new Folders({
      _id: `fold_${generateUUID()}`,
      name,
      root: parentFolder ? false : true,
      level: parentFolder ? parentFolder.level + 1 : 0,
      parentId,
      createdAt: new Date(),
    });

    // | Save folder in database
    const savedFolder = await newFolder
      .save()
      .then((response: Response) => {
        return response;
      });

    if (parentFolder) {
      // | Update parent folder
      await addNewChildren(parentId, newFolder._id);
    }

    // | Return folder
    res.status(200).json(savedFolder);
  },
  /**
   * @description Update a folder
   * @param req Request
   * @param res Response
   * @returns Returns a folder
   */
  updateFolder: async (req: Request, res: Response) => {
    // | Get datas from request
    const {
      id
    } = req.params;
    const {
      name,
      parentId,
      childrensId,
      documentsId
    } = req.body;

    // | Check new data concordance
    checkDataConcordance(id, childrensId, parentId);

    // | Check if folder exists & get it
    const folder = await Folders
      .findOne({
        _id: id
      })
      .then((response) => {
        if (!response) throw new Error('Folder not found');
        return response;
      });

    // | Check if parent folder & if parent folder exists & get it
    const parentFolder = parentId ? await getParentFolder(parentId) : null;
    console.log("Parent: ", parentFolder);


    console.log("Folder: ", folder);
    console.log("Req.body: ", req.body);
    console.log((parentId !== folder.parentId))
    console.log(!!folder.childrensId);
    console.log(!!childrensId);
    console.log(((parentId !== folder.parentId) && folder.childrensId && !childrensId));
    // | Check new datas with old datas

    if ((!parentId && folder.parentId) && (!childrensId && folder.childrensId)) {
      console.log("first case");
      await checkDataConcordance(id, folder.childrensId, folder.parentId);
    } else if ((!parentId && folder.parentId) || ((childrensId !== folder.childrensId) && folder.parentId && !parentId)) {
      console.log("2nd case");
      await checkDataConcordance(id, childrensId, folder.parentId);
    } else if ((!childrensId && folder.childrensId) || ((parentId !== folder.parentId) && folder.childrensId && !childrensId)) {
      console.log("3rd case");
      await checkDataConcordance(id, folder.childrensId, parentId);
    }

    // | Set level according to the position of the folder in the tree structure 
    const level = parentFolder ?
      parentFolder.level + 1 :
      parentId === null ?
      0 :
      folder.level;

    // | Update folder with datas in database
    await Folders
      .updateOne({
        _id: id
      }, {
        name,
        parentId,
        level,
        childrensId,
        documentsId,
        root: parentFolder ? false : true,
        updatedAt: new Date(),
      })
      .then((response) => {
        if (!response) throw new Error('Folder not updated correctly');
      });

    // | Get folder updated and return folder before and after update
    const updatedFolder = await Folders
      .findOne({
        _id: id
      })
      .then((response) => {
        if (!response) throw new Error('Folder not found');
        return response;
      });

    // | Propagate update to other folders
    await compareDatasToPropagateUpdate(folder, updatedFolder);

    // | Return new & old folder
    res.status(200).json({
      old: folder,
      updated: updatedFolder,
    });
  },
};

// ? Export
export default foldersController;
