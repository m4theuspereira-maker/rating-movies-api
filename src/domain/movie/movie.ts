import { getAgeByBirthDateDto } from "../date/date-helper";
import { BusinessError } from "../errors/business-error";
import { Actor } from "./actor";
import { Director } from "./director";

export interface Movie {
  title: string;
  actors: Array<Actor>;
  director: Director | Array<Director>;
  gender: string;
}

export interface createMovieDto {
  title: string;
  actors: Array<createMovieActorAndDirectorDto>;
  director:
    | createMovieActorAndDirectorDto
    | Array<createMovieActorAndDirectorDto>;
  gender: string;
}

export interface createMovieActorAndDirectorDto {
  name: string;
  birthDate: getAgeByBirthDateDto;
}

export type MovieCreationResult = BusinessError | Movie;

export class MovieEntity {
  createMovie(createMovieDto: Movie): MovieCreationResult {
    const movie = {
      ...createMovieDto,
    };

    return movie;
  }
}
