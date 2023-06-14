import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  //variables a editar
  imagesource:any;
  Nombre: string = "";
  password: string = "";
  telefono: string = "";
  direccion: string = "";
  comunac: string = "";
  comunaE: string = "";
  Objetos: string = "";
  //variables comprobacion de usuario
  sesionC: boolean = false;
  sesionE: boolean = false;
  //variables para mostrar el local storage
  Iduser: string;
  nomb: string;
  dire: string;
  comun: string;
  telef: string;
  pass: string;
  object: string;
  constructor(public fb: FormBuilder,private router: Router, private http: HttpClient, private alertController: AlertController) {
    this.nomb = JSON.parse(localStorage.getItem('nombre')!);
    this.dire = JSON.parse(localStorage.getItem('direccion')!);
    this.comun = JSON.parse(localStorage.getItem('comuna')!);
    this.telef = JSON.parse(localStorage.getItem('telefono')!);
    this.pass = JSON.parse(localStorage.getItem('pass')!);
    this.object = JSON.parse(localStorage.getItem('objeto')!);
    this.Iduser = JSON.parse(localStorage.getItem('IdUsario')!);
    if(localStorage.getItem('Usuario') !== null){
      this.sesionC = true;
    }
    else{
      this.sesionE = true;
    }
   }
   async actualizar(){
    // if(this.Nombre === "")
    // {
    //   this.Nombre = this.nomb ;
    // }
    // if(this.password === "")
    // {
    //   this.password = this.pass;
    // }
    // if(this.direccion === "")
    // {
    //   this.direccion = this.direccion;
    // }
    // if(this.telefono === "")
    // {
    //   this.telefono = this.telef;
    // }
    // if(this.comunac === "")
    // {
    //   this.comunac = this.comun;
    // }
    console.log(this.Iduser);
    const api = `http://localhost:3000/usuarios/${this.Iduser}`;
    const usuarios = {
      nombre: this.Nombre,
      contrasenia: this.password,
      foto: 'asdas.jpg',
      direccion: this.direccion,
      telefono: this.telefono,
      comuna: this.comunac,
    };
    try {
      console.log(usuarios);
      const response = await this.http.put(api, usuarios).toPromise();
      console.log(response);
      const alert = await this.alertController.create({
        header: 'Edicion exitosa',
        message: 'El usuario ha sido actualizado exitosamente.',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/usuario'])
    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error al registrar',
        message: 'Ha ocurrido un error al registrar el usuario.',
        buttons: ['OK'],
      });
      await alert.present();
    }
   }

   async ActualizarEmp() {
    // if(this.Nombre === "")
    // {
    //   this.Nombre = this.nomb ;
    // }
    // if(this.password === "")
    // {
    //   this.password = this.pass;
    // }
    // if(this.direccion === "")
    // {
    //   this.direccion = this.direccion;
    // }
    // if(this.telefono === "")
    // {
    //   this.telefono = this.telef;
    // }
    // if(this.comunac === "")
    // {
    //   this.comunaE = this.comun;
    // }
    // if(this.Objetos === "")
    // {
    //   this.Objetos = this.object;
    // }
    const api = `http://localhost:3000/usuariosEmp/${this.Iduser}`;
    const usuarios = {
      nombre: this.Nombre,
      contrasenia: this.password,
      foto: 'asdas.jpg',
      direccion: this.direccion,
      telefono: this.telefono,
      comuna: this.comunaE,
      objReciclaje: this.Objetos,
    };
    try {
      console.log(usuarios);
      const response = await this.http.put(api, usuarios).toPromise();
      console.log(response);
      const alert = await this.alertController.create({
        header: 'Edicion exitosa',
        message: 'El usuario ha sido actualizado exitosamente.',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/usuario'])
    } catch (error) {
      console.log(error);
      const alert = await this.alertController.create({
        header: 'Error al registrar',
        message: 'Ha ocurrido un error al registrar el usuario.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source:CameraSource.Prompt
    });
    localStorage.setItem('Foto', this.imagesource);;;
  };
  getPhoto(){
    return localStorage.getItem('Foto');
  }

  ngOnInit() {
  }

}
