import { createMovieDto, MovieEntity } from "@/domain/movie/";
import { mock, MockProxy } from "jest-mock-extended";
import { DateHelper } from "@/domain/date/date-helper";
import { BusinessError } from "@/domain/errors/business-error";

describe("Movie Entity", () => {
  let movieEntity: MockProxy<MovieEntity>;
  let dateHelper: MockProxy<DateHelper>;
  let movieEntitySut: MovieEntity;
  const MOVIE_DATA: createMovieDto = {
    title: "any_movie_title",
    actors: [
      {
        name: "any_name_actor",
        birthDate: {
          day: "01",
          month: "01",
          year: "2000",
        },
      },
      {
        name: "any_name_actor_2",
        birthDate: {
          day: "01",
          month: "01",
          year: "2000",
        },
      },
    ],
    director: {
      name: "any_name_actor",
      birthDate: {
        day: "01",
        month: "01",
        year: "2000",
      },
    },
    gender: "any_gender",
  };

  beforeAll(() => {
    movieEntity = mock();
    dateHelper = mock();
    dateHelper.getAgeByBirthDate.mockImplementation(() => 22);
    movieEntitySut = new MovieEntity(dateHelper);
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

  test("should return a movie", () => {
    const movie = movieEntitySut.createMovie(MOVIE_DATA);

    expect(movie).toStrictEqual({
      title: "any_movie_title",
      actors: [
        {
          name: "any_name_actor",
          age: 22,
        },
        {
          name: "any_name_actor_2",
          age: 22,
        },
      ],
      director: {
        name: "any_name_actor",
        age: 22,
      },

      gender: "any_gender",
    });
  });

  test("should return business error if invalid age", () => {
    dateHelper.getAgeByBirthDate.mockImplementationOnce(() => -22);

    expect(() => {
      movieEntitySut.createMovie(MOVIE_DATA);
    }).toThrowError(new BusinessError());
  });
});
