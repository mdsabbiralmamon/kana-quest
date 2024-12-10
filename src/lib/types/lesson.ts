export interface Lesson {
    _id: string;
    title: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Vocabulary {
    _id: string;
    word: string;
    pronunciation: string;
    whenToSay: string;
    lesson: string;
    createdAt?: string;
    updatedAt?: string;
  }
  