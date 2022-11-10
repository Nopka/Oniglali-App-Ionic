import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Pokedex } from '../models/pokedex';
import { PokedexService } from '../services/pokedex/pokedex.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {
  public NbPokemons:number = 1;
  public PokedexNational:Pokedex = [];
  constructor(
    protected pokedex: PokedexService,
    protected loadingController: LoadingController
  ) {  
  }

  async ngOnInit() {
    // appel des fonctions à l'initialisation
    await this.loadNbPokemons();
    await this.PopulatePokedex();
    // this.testApiCalls(1);
  }

  async loadNbPokemons(){
    //création du loader à afficher en attendant la réponse du service
    const loading = await this.loadingController.create({
      message: 'Loading  ...',
      spinner: 'bubbles',
    });
    //attribution de ce loader comme actif
    await loading.present();

    this.pokedex.numberOfPokemons().subscribe(
      (res) => {
        this.NbPokemons = res;
        console.log(res);
        loading.dismiss();
      },
      (err) => {
        console.log(err);
        loading.dismiss();
      }
    );
  }

  async PopulatePokedex(){
    console.log("function PopulatePokedex() launched ...")
    //création du loader à afficher en attendant la réponse du service
    const loading = await this.loadingController.create({
      message: 'Loading  ...',
      spinner: 'bubbles',
    });
    console.log("right after the creation of loading");
    //attribution de ce loader comme actif
    await loading.present();
    console.log("right after the loading.present()");
    console.log("NbPokemons = ",this.NbPokemons);
    for (let id = 1; id <= this.NbPokemons; id++) {
      console.log(id);
      this.pokedex.getPokemon(id).subscribe(
        (res) => {
          this.PokedexNational.push(res);
          loading.dismiss();
        },
        (err) => {
          console.log(err);
          loading.dismiss();
        }
      )
      console.log("pokedex national : ",this.PokedexNational);
    }
    let temp = this.sort_by_key(this.PokedexNational,'id');
    this.PokedexNational = temp;
  }

  sort_by_key(array, key){
      return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
  }
  async testApiCalls(idPoke){
    console.log("appel de la fonction testApiCalls");
    this.pokedex.getPokemon(idPoke).subscribe(
      (res) =>{
        console.log("logging de res dans subscribe");
        console.log(res);
      }
    )
  }
}
