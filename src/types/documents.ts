
export interface Document {
  id: string;
  title: string;
  fileType: string;
  size: string;
  dateAdded: Date;
  inKnowledgeBase: boolean;
  tags: string[];
  category?: string;
  content?: string;
}
