import { BusinessError } from "../errors/business-error";
import { Actor } from "./actor";
import { Director } from "./director";

export interface Movie {
  title: string;
  actors: Array<Actor>;
  director: Director | Array<Director>;
  gender: string;
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
