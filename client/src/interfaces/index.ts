export interface DocumentInterface {
  id: string;
  title: string;
  content?: string;
  folderId?: string;
  labelsIds?: string[];
  createdBy?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface FolderInterface {
  id: string;
  name: string;
  root: boolean;
  level: number;
  parentId?: string;
  childrensId?: string[] | [];
  documentsId?: string[] | [];
  createdBy?: string; 
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

