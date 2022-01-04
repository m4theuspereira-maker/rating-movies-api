export interface Rating {
  movieId: string;
  userId: string;
  score: number;
  comment?: string;
  isActive: boolean;
}

export interface createRatingDto {
  userId: string;
  movieId: string;
  score: number;
  comment?: string;
}

export class RatingEntity {
  createRating(rating: createRatingDto): void {}

  validateComment(comment: string): boolean {
    let isCommentValid = false;

    if (comment.length < 10) {
      isCommentValid = false;
    }

    return isCommentValid;
  }
}
