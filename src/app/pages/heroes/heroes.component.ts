import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando: boolean =true;

  constructor( private _heroesService: HeroesService ) { }

  ngOnInit(): void {
    this._heroesService.getHeroes()
      .subscribe(
        (resp) =>{
          this.heroes = resp;
          this.cargando = false;
        }
      );
  }

  eliminarHeroe( heroe: HeroeModel, idx: number ){

    Swal.fire({
      title: '¿Esta seguro?',
      text: '¡No podras revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar!',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then(
      ( result ) =>{
        if(result.value){
          this._heroesService.eliminarHeroe( heroe.id ).subscribe();
          this.heroes.splice( idx, 1 );

          Swal.fire(
            'Eliminado!',
            'El registro se a eliminado correctamente',
            'success'
          )
        }        
      }
    );
  }

}
