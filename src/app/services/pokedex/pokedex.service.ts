import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from 'src/app/models/pokemon';
import { Type } from 'src/app/models/type';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  //fonction priver pour créer un objet "Pokemon"
  private unpackPokemon(res): Pokemon{
    // console.log(res)
    //tableau des types du pokemon
    let tempTypes : Type[] = [];
    // console.log(tempTypes);
    //on parcour les différents types du pokemon reçu de l'api
    res.types.forEach(typefound => {
      //on crée l'objet "Type" qui va recevoir les valeurs de l'api
      const tempType : Type = {
        slot: typefound.slot,
        name: typefound.type.name
      }
      //on ajoute l'objet de type au tableau de types
      tempTypes.push(tempType);
    });

    //on retourne l'objet "Pokemon"
    let pokemon: Pokemon = {
      name: res.name,
      id: res.id,
      sprite: res.sprites.front_default,
      types: tempTypes
    }
    return pokemon
  }

  //fonction permettant de récupérer le nombre total de pokemon
  numberOfPokemons = (): Observable<number> => {
    return this.http.get(
      `https://pokeapi.co/api/v2/pokemon-species/`
    )
    .pipe(map((res:any) => res.count))
  }


  //fonction permettant de réupérer les pokemons avec leurs informations
  getPokemon = (idPokemon): Observable<Pokemon> => {
    return this.http.get(
      `https://pokeapi.co/api/v2/pokemon/${idPokemon}`
    )
    .pipe(map((res:any) => this.unpackPokemon(res)))
  }


  constructor(private http: HttpClient) { }
}
