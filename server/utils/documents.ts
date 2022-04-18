import { Folders } from '../schema';

/**
 * @description Add a document to a folder
 * @param folderId String - Folder id
 * @param documentId String - Document id
 */
export const addNewDocumentToFolder = async (folderId: string, documentId: string) => {
  await Folders.updateOne({ _id: folderId }, { $push: { documentsId: documentId } });
}

/**
 * @description Remove a document from a folder
 * @param folderId String - Folder id
 * @param documentId String - Document id
 */
export const removeDocumentFromFolder = async (folderId: string, documentId: string) => {
  await Folders.updateOne({ _id: folderId }, { $pull: { documentsId: documentId } });
}

/**
 * @description Check if a folder need an update after a document update
 * @param oldData Object - Old data of the folder
 * @param newData Object - New data of the folder
 */
export const checkFoldersUpdate = async (oldData: any, newData: any) => {
  const id = oldData._id;
  // ? folderId
  // ~ Old folderId && !New folderId
  if (oldData.folderId && newData.folderId === null) {
    await removeDocumentFromFolder(oldData.folderId, id);
  }
  // ~ New folderId && !Old folderId
  if (newData.folderId && !oldData.folderId) {
    await addNewDocumentToFolder(newData.folderId, id);
  }

  // ~ Old folderId && New folderId && !Same folderId
  if (oldData.folderId && newData.folderId && (oldData.folderId !== newData.folderId)) {
    await removeDocumentFromFolder(oldData.folderId, id);
    await addNewDocumentToFolder(newData.folderId, id);
  }
}
