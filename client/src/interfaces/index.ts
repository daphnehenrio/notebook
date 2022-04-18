// ? Folder
export interface FolderInterface {
  _id: string;
  name: string;
  root: boolean;
  level: number;
  parentId?: string;
  childrensId: string[] | [];
  documentsId: string[] | [];
  createdAt: Date;
  updatedAt?: Date;
}
// ? Document
export interface DocumentInterface {
  _id: string;
  title: string;
  content?: string;
  folderId?: string;
  labelsId: string[];
  createdAt: Date;
  updatedAt?: Date;
}

// ? Label
export interface LabelInterface {
  _id: string;
  name: string;
  color?: string;
  createdAt: Date;
  updatedAt?: Date;
}
