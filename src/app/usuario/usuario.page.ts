import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  nomb: String;
  dire: String;
  comun: string;
  telef: string;
  fecha: string;
  sesionC: boolean = false;
  sesionE: boolean = false;
  constructor(private router : Router) { 
    this.nomb = JSON.parse(localStorage.getItem('nombre')!);
    this.dire = JSON.parse(localStorage.getItem('direccion')!);
    this.comun = JSON.parse(localStorage.getItem('comuna')!);
    this.telef = JSON.parse(localStorage.getItem('telefono')!);
    this.fecha = JSON.parse(localStorage.getItem('fecha')!); 
    if(localStorage.getItem('Usuario') !== null){
      this.sesionC = true;
    }
    else{
      this.sesionE = true;
    }

  }

  cerrar(){
    localStorage.clear();
    this.router.navigate(['/home'])
  }
  ngOnInit() {
    
  }
}
