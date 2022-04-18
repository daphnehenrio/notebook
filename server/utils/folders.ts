import { Folders } from '../schema';

/**
 * @description Get a parent folder
 * @param folderId String - Folder id
 * @returns Folder
 */
export const getParentFolder = async (folderId: String) => {
  return Folders
    .findOne({ _id: folderId })
    .then((response) => {
      if (!response) throw new Error('Parent folder not found');
      return response;
    });
}

/**
 * @description Check if datas are valid
 * @param id String - Folder id
 * @param childrensId Array - Childrens id
 * @param parentId String - Parent id
 * @returns Void
 */
export const checkDataConcordance = async (id?: String, childrensId?: String[], parentId?: String ) => {
  // ~ Children === Parent ?
  if (parentId && childrensId?.includes(parentId)) {
    throw new Error('You are not allowed to set a parent folder as a child of folder');
  }

  // ~ Children === Itself ?
  if (id && childrensId?.includes(id)) {
    throw new Error('You are not allowed to set a folder as a child of itself');
  }

  // ~ Parent === Itself ?
  if ((id && parentId) && parentId === id) {
    throw new Error('You are not allowed to set a folder as a parent of itself');
  }

  return;
}

/**
 * @description Add new children to a folder
 * @param parentId String - Parent id
 * @param childrensId String | Array - Children id
 */
export const addNewChildren = async (parentId: string, childrensId: string | string[]) => {
  await Folders.updateOne({ _id: parentId }, { $push: { childrensId: childrensId } });
};

/**
 * @description Remove children from a folder
 * @param parentId String - Parent id
 * @param childrensId String | Array - Children id
 */
export const removeOldChildren = async (parentId: string, childrensId: string | string[]) => {
  await Folders.updateOne({ _id: parentId }, { $pull: { childrensId: childrensId } });
}

/**
 * @description Add new parent to a folder
 * @param folderId String - Folder id
 * @param parentId String - Parent id
 * @param level Number - Level
 */
export const addNewParent = async (folderId: string, parentId: string, level: number) => {
  await Folders.updateOne({ _id: folderId }, { 
    parentsId: parentId,
    level,
    root: false,
    updatedAt: new Date(),
  });
}

/**
 * @description Remove parent from a folder
 * @param folderId String - Folder id
 */
export const removeOldParent = async (folderId: string) => {
  await Folders.updateOne({ _id: folderId }, { 
    parentsId: null,
    level: 0,
    root: true,
    updatedAt: new Date(),
  });
}

/**
 * @description Check if a folder need an update after an other folder update or create
 * @param oldData Object - Old data of the folder
 * @param newData Object - New data of the folder
 */
export const compareDatasToPropagateUpdate = async (oldData: any, newData: any) => {
  const id = oldData._id;
  // ? parentId
  // ~ Old parent && !New parent
  if (oldData.parentId && newData.parentId === null) {
    await removeOldChildren(oldData.parentId, id);
  }

  // ~ New parent && !Old parent
  if (newData.parentId && !oldData.parentId) { 
    await addNewChildren(newData.parentId, id);
  }

  // ~ Old parent && New parent && !Same parent
  if (oldData.parentId && newData.parentId && oldData.parentId !== newData.parentId) {
    await removeOldChildren(oldData.parentId, id);
    await addNewChildren(newData.parentId, id);
  }

  // ? childrenId
  // ~ Old childrens && !New children
  if (oldData.childrensId && newData.childrensId === []) {
    oldData.childrensId.forEach(async (childrenId: string) => {
      await removeOldParent(childrenId);
    });
  }

  // ~ New children && !Old children
  if (newData.childrensId && (!oldData.childrensId || oldData.childrensId.length === 0)) {
    newData.childrensId.forEach(async (childrenId: string) => {
      await addNewParent(childrenId, id, newData.level + 1);
    });
  }

  // ~ Old children && New children && !Same children
  if (oldData.childrensId && newData.childrensId && oldData.childrensId !== newData.childrensId) {
    const oldChildrensToRemove = oldData.childrensId.filter((childrenId: string) => !newData.childrensId.includes(childrenId));
    const newChildrensToAdd = newData.childrensId.filter((childrenId: string) => !oldData.childrensId.includes(childrenId));

    oldChildrensToRemove.forEach(async (childrenId: string) => {
      await removeOldParent(childrenId);
    });

    newChildrensToAdd.forEach(async (childrenId: string) => {
      await addNewParent(childrenId, id, newData.level + 1);
    });
  }
}