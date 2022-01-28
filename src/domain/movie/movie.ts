import { DateHelper, getAgeByBirthDateDto } from "../date/date-helper";
import { BusinessError } from "../errors/business-error";
import { Actor } from "./actor";
import { Director } from "./director";

export interface Movie {
  title: string;
  actors: Array<Actor>;
  director: Director;
  gender: string;
}

export interface createMovieDto {
  title: string;
  actors: Array<createMovieActorAndDirectorDto>;
  director: createMovieActorAndDirectorDto;
  gender: string;
}

export interface createMovieActorAndDirectorDto {
  name: string;
  birthDate: getAgeByBirthDateDto;
}

export type MovieCreationResult = BusinessError | Movie;

export class MovieEntity {
  constructor(private readonly dateHelper: DateHelper) {}

  createMovie({
    title,
    actors,
    director,
    gender,
  }: createMovieDto): MovieCreationResult {
    let actorsWithAge: Array<Actor> = [];

    actors.forEach((actor) => {
      actorsWithAge.push({
        name: actor.name,
        age: this.dateHelper.getAgeByBirthDate(actor.birthDate),
      });
    });

    const directorWithAge: Director = {
      name: director.name,
      age: this.dateHelper.getAgeByBirthDate(director.birthDate),
    };

    const someActorOrDirectorWithNegativeAge =
      actorsWithAge.some((actor) => actor.age < 1) || directorWithAge.age < 1;

    if (someActorOrDirectorWithNegativeAge) {
      throw new BusinessError();
    }

    const movie: Movie = {
      title,
      actors: actorsWithAge,
      director: directorWithAge,
      gender,
    };

    return movie;
  }
}
