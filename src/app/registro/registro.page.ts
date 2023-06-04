import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//librerias de formulario
import {  FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
//se importan las librerias del alert y el cliente donde se solicita los datos
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {
  //Variables de registro del formulario
  formularioRegistroC: FormGroup;
  formularioRegistroE: FormGroup;
  //se crea la variable select tabs
  selectTabs = 'recent';
  //Funcion checkbox
  checkbox1 = false;
  checkbox2 = true;
  onClickCheckbox1() {
    if(this.checkbox2 = false){
    this.checkbox1 = true;
    }
    else
    this.checkbox1 = false;
  }
  onClickCheckbox2() {
    if(this.checkbox1 = false){
      this.checkbox2 = true;
    }
  }
  //se le coloca los campos a los formularios con la validación de no tener campos vacios
  //inicializa los imports
  constructor(public fb: FormBuilder,private router: Router, private http: HttpClient, private alertController: AlertController) { 
    this.formularioRegistroC = this.fb.group({
      'nombre' : new FormControl("", Validators.required),
      'password' : new FormControl ("", Validators.required),
      'correo' : new FormControl ("", Validators.required),
      'fecha' : new FormControl ("", Validators.required),
      'direccion' : new FormControl ("", Validators.required),
      'telefono' : new FormControl ("", Validators.required),
      'comunac' : new FormControl ("", Validators.required)
    })
    this.formularioRegistroE = this.fb.group({
      'nombreE' : new FormControl("", Validators.required),
      'passwordE' : new FormControl ("", Validators.required),
      'correoE' : new FormControl ("", Validators.required),
      'fechaE' : new FormControl ("", Validators.required),
      'direccionE' : new FormControl ("", Validators.required),
      'telefonoE' : new FormControl ("", Validators.required)
    })

  }
  //se crea la funcion registrar para enviar los datos a la base de datos
  async registrar() {
    const api = 'http://localhost:3000/usuarios';
    const usuarios = {
      nombre: this.formularioRegistroC.value.nombre,
      contrasenia: this.formularioRegistroC.value.password,
      correo: this.formularioRegistroC.value.correo,
      foto: 'asdas.jpg',
      direccion: this.formularioRegistroC.value.direccion,
      telefono: this.formularioRegistroC.value.telefono,
      comuna: this.formularioRegistroC.value.comunac,
      fechaNacimiento: this.formularioRegistroC.value.fecha,

    };
    try {
      console.log(usuarios);
      const response = await this.http.post(api, usuarios).toPromise();
      console.log(response);
      const alert = await this.alertController.create({
        header: 'Registro exitoso',
        message: 'El usuario ha sido registrado exitosamente.',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/home'])
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
  async registrarE() {
    const api = 'http://localhost:3000/usuarios';
    const usuarios = {
      nombre: '',
      contrasenia: '',
      correo: '',
      direccion: '',
      tranporte:'',
      objetoreciclaje:'',
    };
    try {
      const response = await this.http.post(api, usuarios).toPromise();
      console.log(response);
      const alert = await this.alertController.create({
        header: 'Registro exitoso',
        message: 'El usuario ha sido registrado exitosamente.',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/home'])
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
  


  //se obtienen los datos del usuario
  async obtenerUsuarios() {
    const api = 'http://localhost:3000/usuarios';
    try {
      const response = await this.http.get(api).toPromise();
      console.log(response);
      } catch (error) {
      console.log(error);
    }
  }
  ngOnInit() {
  }

}
