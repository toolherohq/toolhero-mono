
import { HeroRequest } from "../HeroRequest"
import { HeroResponse } from "../HeroResponse";
export interface IRouteHandler {
  (request: HeroRequest, response: HeroResponse): void;
}
