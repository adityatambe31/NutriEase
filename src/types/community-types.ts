export interface Article {
  title: string;
  summary: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    image: string;
    role: string;
  };
  date: string;
  likes: number;
  comments: number;
  link: string;
}

export interface Experience {
  title: string;
  content: string;
  author: {
    name: string;
    image: string;
    role: string;
  };
  date: string;
  likes: number;
  comments: number;
  tags: string[];
}

export interface Testimony {
  title: string;
  story: string;
  author: string;
  authorImage: string;
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  timestamp: string;
  featured?: boolean;
}

export interface Survey {
  title: string;
  questions: Array<{
    question: string;
    options: string[];
  }>;
  estimatedTime: string;
  participantCount: number;
  featured?: boolean;
}

export type ContentItem = Article | Experience | Testimony | Survey;

export type ContentType = {
  articles: Article[];
  experiences: Experience[];
  testimonies: Testimony[];
  surveys: Survey[];
};

export type { ContentType as default };
