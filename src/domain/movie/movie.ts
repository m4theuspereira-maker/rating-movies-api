import { Actor } from "./actor";
import { Director } from "./director";

export interface Movie {
  title: string;
  actors: Array<Actor>;
  director: Director | Array<Director>;
  gender: string;
}
