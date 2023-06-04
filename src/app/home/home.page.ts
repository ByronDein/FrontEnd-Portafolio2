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
  //se llama a la libreria en el constructor
  constructor(private router : Router, private http: HttpClient, private alertController: AlertController) {}
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
          localStorage.setItem('sesion', this.email);
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
