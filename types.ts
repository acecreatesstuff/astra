
export type Category = 'Action' | 'Puzzle' | 'Casual' | 'Sports' | 'Strategy' | 'Arcade';
export type View = 'Games' | 'Proxy' | 'AIHelper' | 'Profile' | 'Settings';

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  category: Category;
  plays: number;
  rating: number;
}

export interface RecommendedGame {
  id: string;
  reason: string;
}

export interface User {
  username: string;
  email?: string;
  joinedAt: string;
  xp: number;
  isAstraPlus?: boolean;
}
