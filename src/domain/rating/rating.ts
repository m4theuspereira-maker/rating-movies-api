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
    userId
  }: createRatingDto): RatingCreationResult {
    const isScoreValid = this.validateScore(score);

    if (!isScoreValid) {
      throw new BusinessError();
    }

  // eslint-disable-next-line prefer-const
  let rating: Rating = {
      userId: userId,
      movieId: movieId,
      score: score,
      isActive: true
    };

    if (comment !== undefined) {
      const isCommentValid = this.validateComment(comment);
      if (!isCommentValid) {
        throw new BusinessError();
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

  validateScore(score: number): boolean {
    let isScoreValid = true;

    if (score > 5 || score < 1) {
      isScoreValid = false;
    }

    return isScoreValid;
  }
}
