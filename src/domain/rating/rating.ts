import { BusinessError } from "../errors/business-error";

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

export type RatingCreationResult = Rating | BusinessError;

export class RatingEntity {
  createRating({
    movieId,
    score,
    comment,
    userId,
  }: createRatingDto): RatingCreationResult {
    let rating: Rating;

    rating = {
      userId: userId,
      movieId: movieId,
      score: score,
      isActive: true,
    };

    if (comment !== undefined) {
      const isCommentValid = this.validateComment(comment);
      if (!isCommentValid) {
        return new BusinessError();
      }

      rating.comment = comment;
    }

    return rating;
  }

  validateComment(comment: string = ""): boolean {
    let isCommentValid = true;

    if (comment.length <= 10) {
      isCommentValid = false;
    }

    return isCommentValid;
  }
}
