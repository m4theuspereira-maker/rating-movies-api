export interface Rating {
  movieId: string;
  userId: string;
  score: number;
  comment?: string;
  isActive: boolean;
}
