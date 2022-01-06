import { MovieEntity } from "@/domain/movie/";
import { mock, MockProxy } from "jest-mock-extended";

describe("Movie Entity", () => {
  let movieEntity: MockProxy<MovieEntity>;
  let movieEntitySut: MovieEntity;
  const MOVIE_DATA = {
    title: "any_movie_title",
    actors: [
      { name: "any_name_actor", age: 30 },
      { name: "any_name_actor_2", age: 31 },
    ],
    director: { name: "any_name_actor", age: 30 },
    gender: "any_gender",
  };

  beforeAll(() => {
    movieEntity = mock();
    movieEntitySut = new MovieEntity();
  });

  test("should call createMovie", () => {
    const movieEntitySpy = jest.spyOn(movieEntity, "createMovie");

    movieEntity.createMovie(MOVIE_DATA);

    expect(movieEntitySpy).toHaveBeenCalled();
  });

  test("should call createMovie", () => {
    const movieEntitySpy = jest.spyOn(movieEntity, "createMovie");

    movieEntity.createMovie(MOVIE_DATA);

    expect(movieEntitySpy).toHaveBeenCalledWith(MOVIE_DATA);
  });

  test("should return an user", () => {
    const movie = movieEntitySut.createMovie(MOVIE_DATA);

    expect(movie).toStrictEqual(MOVIE_DATA);
  });
});
