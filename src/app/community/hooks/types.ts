export interface Author {
  name: string;
  image?: string;
  role?: string;
}

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

export interface Testimony {
  title: string;
  author: string;
  story: string;
  authorImage: string;
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  timestamp: string;
  featured: boolean;
}


export interface Survey {
  title: string;
  questions: {
    question: string;
    options: string[];
  }[];
  estimatedTime: string;
  participantCount: number;
  featured: boolean;
}

export interface Experience {
  author: {
    name: string;
    image: string;
    role: string;
  };
  title: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
  tags: string[];
}

export interface CommunityContent {
  articles: Article[];
  testimonies: Testimony[];
  surveys: Survey[];
  experiences: Experience[];
}