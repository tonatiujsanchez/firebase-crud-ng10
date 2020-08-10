import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  private url:string = 'https://crudapp-a682e.firebaseio.com';
  constructor( private http: HttpClient ) { }



  crearHeroe( heroe: HeroeModel ){
   return this.http.post<any>( `${ this.url }/heroes-ng10.json`, heroe )
           .pipe(
             map(
               ( resp:any ) =>{
                  heroe.id = resp.name;
                  return heroe;
               }
             )
           );
  }

  actualizarHeroe( heroe: HeroeModel ){

    const heroeTemp = { ...heroe }
    delete heroeTemp.id;

    return this.http.put( `${ this.url }/heroes-ng10/${ heroe.id }.json`, heroeTemp );
  }
  
  getHeroe( idHeroe: string ){
    return this.http.get( `${ this.url }/heroes-ng10/${ idHeroe }.json`);
  }

  eliminarHeroe( idHeroe ){
    return this.http.delete( `${ this.url }/heroes-ng10/${ idHeroe }.json`);
  }

  getHeroes(){
    return this.http.get(`${ this.url }/heroes-ng10.json`)
      .pipe(
        map(
          respObj =>{
            return this.crearArreglo( respObj );
          }
        )
      );
  }
  private crearArreglo( respObj: object ){
    const heroesArr: HeroeModel[] = [];
    if( respObj === null ){
      return [];
    }

    Object.keys( respObj ).forEach(
      key =>{
        const heroe: HeroeModel = respObj[key];
        heroe.id = key;

        heroesArr.push( heroe );
      }
    );

    return heroesArr;
  }

}
