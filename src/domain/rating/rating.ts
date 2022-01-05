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

export class RatingEntity {
  createRating({ movieId, score, comment, userId }: createRatingDto): void {
    let isCommentValid = true;

    if (comment !== undefined) {
      isCommentValid = this.validateComment(comment);
    }

    if (!isCommentValid) {
      throw new BusinessError();
    }
  }

  validateComment(comment: string = ""): boolean {
    let isCommentValid = true;

    if (comment.length <= 10) {
      isCommentValid = false;
    }

    return isCommentValid;
  }
}
