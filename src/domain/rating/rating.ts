export interface Rate {
  movieId: string;
  userId: string;
  score: number;
  comment?: string;
  isActive: boolean;
}
