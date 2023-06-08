import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectTabs = 'recent';
  email: any;
  pass: any;
  emailEmp: any;
  passEmp: any;
  //se llama a la libreria en el constructor
  nomb: string;
  dire: string;
  telef: string;
  comun: string;
  fecha: string;
  obje: string;
  constructor(private router : Router, private http: HttpClient, private alertController: AlertController) {
    this.nomb = '';
    this.dire = '';
    this.telef = '';
    this.comun = '';
    this.fecha = '';
    this.obje = '';
  }
  //cuenta de cliente
async Cuentav() { 
      const api = 'http://localhost:3000/usuarios/login';
      const login = {
        contrasenia: this.pass,
        correo: this.email,
      };
      try {
        const response: any = await this.http.post(api, login).toPromise();
        console.log(response);
        console.log(response.data);
        console.log(response.message);

        if (response.data !== '' && response.message === 'Login successful') {
          
          this.nomb = JSON.stringify(response.data.nombre);
          this.dire = JSON.stringify(response.data.direccion);
          this.telef = JSON.stringify(response.data.telefono);
          this.comun= JSON.stringify(response.data.comuna);
          this.fecha= JSON.stringify(response.data.fechaNacimiento);
          localStorage.setItem('sesion', this.email);;
          localStorage.setItem('nombre', this.nomb);
          localStorage.setItem('pass', this.pass);;
          localStorage.setItem('direccion', this.dire);;
          localStorage.setItem('telefono', this.telef);;
          localStorage.setItem('comuna', this.comun);;
          localStorage.setItem('fecha', this.fecha);;
          localStorage.setItem('TipoUsuario', "1");;
          this.router.navigate(['/usuario']);

        } 
        else {
          const alert = await this.alertController.create({
            header: 'Error al iniciar sesión',
            message: 'Ha ocurrido un error al iniciar sesión. Verifica tus credenciales e intenta de nuevo.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      } catch (error) {
        console.log(error);
      }
    }
    //cuenta de empresa
    async CuentaE() { 
      const api = 'http://localhost:3000/usuariosEmp/login';
      const login = {
        contrasenia: this.passEmp,
        correo: this.emailEmp,
      };
      try {
        const response: any = await this.http.post(api, login).toPromise();
        console.log(response);
        console.log(response.data);
        console.log(response.message);

        if (response.data !== '' && response.message === 'Login successful') {
          
          this.nomb = JSON.stringify(response.data.nombre);
          this.dire = JSON.stringify(response.data.direccion);
          this.telef = JSON.stringify(response.data.telefono);
          this.comun= JSON.stringify(response.data.comuna);
          this.obje= JSON.stringify(response.data.objReciclaje);
          localStorage.setItem('sesion', this.email);;
          localStorage.setItem('nombre', this.nomb);
          localStorage.setItem('pass', this.pass);;
          localStorage.setItem('direccion', this.dire);;
          localStorage.setItem('telefono', this.telef);;
          localStorage.setItem('comuna', this.comun);;
          localStorage.setItem('objeto', this.obje);;
          localStorage.setItem('TipoUsuario', "2");;
          this.router.navigate(['/usuario']);

        } 
        else {
          const alert = await this.alertController.create({
            header: 'Error al iniciar sesión',
            message: 'Ha ocurrido un error al iniciar sesión. Verifica tus credenciales e intenta de nuevo.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      } catch (error) {
        console.log(error);
      }
    }
}
