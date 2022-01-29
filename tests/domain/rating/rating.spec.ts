import { createRatingDto, RatingEntity } from "@/domain/rating/rating";
import { BusinessError } from "@/domain/errors/business-error";

describe("Rating Entity", () => {
  let ratingEntitySut: RatingEntity;
  const RATING_DATA: createRatingDto = {
    userId: "any_user_id",
    movieId: "any_movie_id",
    score: 3,
    comment: "any_comment",
  };

  beforeAll(() => {
    ratingEntitySut = new RatingEntity();
  });
  test("should call create rating", () => {
    const ratingEntitySpy = jest.spyOn(ratingEntitySut, "createRating");
    ratingEntitySut.createRating(RATING_DATA);
    expect(ratingEntitySpy).toHaveBeenCalled();
  });

  test("should call createRating with rating data", () => {
    ratingEntitySut.createRating(RATING_DATA);
    expect(ratingEntitySut.createRating).toBeCalledWith(RATING_DATA);
  });

  test("should call validate comment with comment", () => {
    const validCommentSpy = jest.spyOn(ratingEntitySut, "validateComment");
    ratingEntitySut.validateComment(RATING_DATA.comment!!);

    expect(validCommentSpy).toHaveBeenCalledWith(RATING_DATA.comment);
  });

  test("should return false if comment has less than 10 characters", () => {
    const validateCommnetResult = ratingEntitySut.validateComment("any_com");

    expect(validateCommnetResult).toEqual(false);
  });

  test("should return true if comment has 10 characters or more", () => {
    const validateCommnetResult = ratingEntitySut.validateComment(
      RATING_DATA.comment
    );

    expect(validateCommnetResult).toEqual(true);
  });

  test("should return a business error if an invalid comment", () => {
    expect(() => {
      ratingEntitySut.createRating({
        comment: "any_com",
        userId: "any_user_id",
        movieId: "any_movie_id",
        score: 3,
      });
    }).toThrowError(new BusinessError());
  });

  test("should return business error of invalid score", () => {
    expect(() => {
      ratingEntitySut.createRating({
        userId: "any_user_id",
        movieId: "any_movie_id",
        score: 6,
      });
    }).toThrowError(new BusinessError());
  });

  test("should return a valid rating if the data were right", () => {
    const validRatinWithComment = ratingEntitySut.createRating(RATING_DATA);

    expect(validRatinWithComment).toStrictEqual({
      userId: "any_user_id",
      movieId: "any_movie_id",
      score: 3,
      isActive: true,
      comment: "any_comment",
    });
  });

  test("should return a valid rating without comment if data were right", () => {
    const validRatingWithoutComment = ratingEntitySut.createRating({
      userId: "any_user_id",
      movieId: "any_movie_id",
      score: 3,
    });

    expect(validRatingWithoutComment).toStrictEqual({
      userId: "any_user_id",
      movieId: "any_movie_id",
      score: 3,
      isActive: true,
    });
  });
});
