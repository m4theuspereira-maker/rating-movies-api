import { Actor } from "../actor/actor";
import { Director } from "../director/director";

export interface Movie {
  title: string;
  actors: Array<Actor>;
  director: Director;
  gender: string;
  average: number;
}
