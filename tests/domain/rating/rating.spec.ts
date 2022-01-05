import { MockProxy, mock } from "jest-mock-extended";
import { createRatingDto, RatingEntity } from "@/domain/rating/rating";

describe("Rating Entity", () => {
  let ratingEntity: MockProxy<RatingEntity>;
  const RATING_DATA: createRatingDto = {
    userId: "any_user_id",
    movieId: "any_movie_id",
    score: 3,
    comment: "any_comment",
  };

  beforeAll(() => {
    ratingEntity = mock();
  });
  test("should call create rating", () => {
    const ratingEntitySpy = jest.spyOn(ratingEntity, "createRating");
    ratingEntity.createRating(RATING_DATA);
    expect(ratingEntitySpy).toHaveBeenCalled();
  });

  test("should call createRating with rating data", () => {
    ratingEntity.createRating(RATING_DATA);
    expect(ratingEntity.createRating).toBeCalledWith(RATING_DATA);
  });

  test("should call validate comment with comment", () => {
    ratingEntity.validateComment(RATING_DATA.comment!!);
    expect(ratingEntity.validateComment).toHaveBeenCalledWith(
      RATING_DATA.comment
    );
  });
});
