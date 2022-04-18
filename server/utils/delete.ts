import { Folders, Documents } from '../schema';

/**
 * @description Delete liaison with other mogo documents
 * @param model String - Model name (folders, documents, labels)
 * @param oldData Object - Old data of the model
 */
export const progateDeleteUpdate = async (model: string , oldData: any) => {
  const {_id } = oldData;
  switch (model) {
    case"folders":
      const {parentId } = oldData;
      if (parentId) {
        await Folders.updateOne({ _id: parentId }, { $pull: { childrensId: _id } });
      }
      break;
    case"documents":
      const { folderId } = oldData;
      if (folderId) {
        await Folders.updateOne({ _id: folderId }, { $pull: { documentsId: _id } });
      }
      break;
    case"labels":
      Documents.updateMany({ $in: { labelsId: _id } }, { $pull: { labelsId: _id } });
      break;
    default:
      break;
  }
}