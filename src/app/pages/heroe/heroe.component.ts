import { Component, OnInit } from '@angular/core';
import { HeroeModel } from '../../models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, from } from 'rxjs';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  
  heroe = new HeroeModel();
  constructor( private _heroesService: HeroesService,
               private activateRoute: ActivatedRoute,
               private router: Router ) { 

                 this.activateRoute.params.subscribe(
                   (resp) =>{
                     if( resp.id !== 'nuevo'){
                      this.cargarHeroe( resp.id );
                     }
                   }
                 );

               }

  ngOnInit(): void {
  }

  guadar( formulario: NgForm ){
  
    if( formulario.invalid ){
      console.log('formulario no valido');
      return;
    }
  
    Swal.fire({
      title: 'Cargando',
      text: 'Guardando informacion',
      icon: 'warning',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if( this.heroe.id ){
      peticion = this._heroesService.actualizarHeroe( this.heroe )
    }else{
      peticion = this._heroesService.crearHeroe( this.heroe );  
    }

     peticion.subscribe(
       (resp) =>{
        Swal.fire({
          title: this.heroe.nombre,
          text: 'Se guardo correctamente',
          icon: 'success'
        });
       }
     );

  }

  cargarHeroe( idHeroe: string ){
    this._heroesService.getHeroe( idHeroe )
      .subscribe(
        (resp: HeroeModel) =>{
          if( resp === null ){
            this.router.navigate(['/heroes']);
            return;
          }

          this.heroe = resp;
          this.heroe.id = idHeroe;          
        }
      );
  }

}
