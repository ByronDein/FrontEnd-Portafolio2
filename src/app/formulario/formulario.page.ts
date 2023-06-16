import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';




@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
  formularioTicket: FormGroup;
  imagesource: any;
  foto: any;

  constructor(public fb: FormBuilder, private http: HttpClient, private alertController: AlertController, private router: Router) {
    {

      this.formularioTicket = this.fb.group({
        'objetos': new FormControl("", Validators.required),
        'cantidad': new FormControl("", Validators.required),
        'direccion': new FormControl("", Validators.required),
        'dimensiones': new FormControl("", Validators.required)
      })
    }
  }



  takePicture = async () => {
    const image: any = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });
    localStorage.setItem('foto', image.dataUrl);
    this.foto = image.dataUrl;
  };
  getPhoto() {
    return this.foto = localStorage.getItem('foto');
  }
  async crearTicket() {
    const idUsuarioString = localStorage.getItem('IdUsuario');
    if (idUsuarioString !== null) {
      // El valor no es null, puedes pasarlo a la función
      const idUsuario = parseInt(idUsuarioString, 10);
      const empresa = 'DuocUC'
      console.log(idUsuario);
      const api = 'http://localhost:3000/tickets';
      const tickets = {
        objeto: this.formularioTicket.value.objetos,
        cantidad: this.formularioTicket.value.cantidad,
        direccion: this.formularioTicket.value.direccion,
        dimensiones: this.formularioTicket.value.dimensiones,
        empresa: empresa,
        usuario_id_usuario: idUsuario,
        foto: this.foto // Usa la URL de S3 en lugar de la URL de almacenamiento local
      };
      console.log(tickets);
      try {
        const res: any = await this.http.post(api, tickets).toPromise();
        console.log(res);
        if (res.message === "Ticket created successfully") {
          const alert = await this.alertController.create({
            header: 'Ticket creado',
            message: 'El ticket se ha creado correctamente.',
            buttons: ['OK'],
          });
          await alert.present();
          this.formularioTicket.reset();
        }
        else {
          const alert = await this.alertController.create({
            header: 'Error al crear el ticket',
            message: 'Ha ocurrido un error al crear el ticket. Por favor, intenta de nuevo más tarde.',
            buttons: ['OK'],
          });
          await alert.present();
          this.formularioTicket.reset();
        }
      } catch (error) {
        const alert = await this.alertController.create({
          header: 'Error al crear el ticket',
          message: 'Ha ocurrido un error al crear el ticket. Por favor, intenta de nuevo más tarde, o revise que los campos esten correctamente rellenados.',
          buttons: ['OK'],
        });
        await alert.present();
        this.formularioTicket.reset();
        console.log(error);
      }
    }
  }



  ngOnInit() {

  }
}
