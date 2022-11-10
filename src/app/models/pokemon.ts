import { Type } from "./type";

export interface Pokemon {
    name: string;
    id: number;
    sprite: string;
    types: Type[];
}