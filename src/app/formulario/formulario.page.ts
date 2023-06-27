import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as base64js from 'base64-js';
import * as pako from 'pako';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';




declare const Buffer: any;
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
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt
    });
    localStorage.setItem('foto', `data:image/jpeg;base64,` + image.base64String);
    console.log(image);
    const base64String = image.base64String;

    // Convertir el base64String a un objeto Blob
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    // Guardar el blob en la variable this.foto
    this.foto = blob;
    console.log(this.foto);
    // Guardar el blob en el almacenamiento local (opcional)
    localStorage.setItem('foto', URL.createObjectURL(blob));
    console.log(localStorage.getItem('foto'));

  };
  getPhoto() {
    return this.foto = localStorage.getItem('foto');
  }
  async crearTicket() {
    const idUsuarioString = localStorage.getItem('IdUsuario');
    if (idUsuarioString !== null) {
      // const base64Image = this.foto; // Replace with your base64 image
      // const data = base64Image.replace(/^data:image\/\w+;base64,/, '');
      // const uint8Array = base64js.toByteArray(data);
      // const blob = new Blob([uint8Array], { type: 'image/png' });
      // const blobUrl = URL.createObjectURL(blob);
      // console.log("adsadds",blobUrl);
      // this.foto = blobUrl; 
      // El valor no es null, puedes pasarlo a la función
      const idUsuario = parseInt(idUsuarioString, 10);
      const empresa = 'DuocUC'
      console.log(idUsuario);
      const apiUser = 'http://localhost:3000/tickets';
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
        const res: any = await this.http.post(apiUser, tickets).toPromise();
        console.log(res);
        if (res.message === "Ticket created successfully") {
          console.log(res);
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
    // this.router.navigate(['/formulario']);
    // this.getTickets()
  }
  // async getTickets() { 
  //   const apiUser = 'http://localhost:3000/tickets';
  //   const res:any = await this.http.get(apiUser).toPromise();
  //   console.log(res);

  //   const ticketEstado = {
  //     estado: 'Activo 231221312313313',
  //     ticketIdTicket :res.data.idTickets,
  //     usuarioEmpId: 1,
  //     fecha: Date.now(),
  //     direccion : res.data.direccion
  //   }
  //   console.log(ticketEstado);
  //   const apiUser2 = 'localhost:3000/ticketsEst';
  //   // const res2:any = this.http.get(apiUser2);
  //   const res2:any =  this.http.post(apiUser2, ticketEstado).toPromise();

  //   console.log(res2);

  // }
  
  
  
  
  ngOnInit() {

  }
}
