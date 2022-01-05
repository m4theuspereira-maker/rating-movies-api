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
  createRating({ movieId, score, comment }: createRatingDto): void {}

  validateComment(comment: string = ""): boolean {
    let isCommentValid = true;

    if (comment.length <= 10) {
      isCommentValid = false;
    }

    return isCommentValid;
  }
}
