import { Actor } from "./actor";
import { Director } from "./director";

export interface Movie {
  title: string;
  actors: Array<Actor>;
  director: Director;
  gender: string;
  average: number;
}
