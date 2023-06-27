import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  tickets: any[] = [];
  fotoBase64: string | null = null; // Declare fotoBase64 as a property of the class
  fotoUrl: any
  base64data: any;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    
    const idUsuarioString = localStorage.getItem('IdUsuario');
    const idUsuarioEmpString = JSON.parse(localStorage.getItem('IdUsuarioEmp')!);
    if (idUsuarioString !== null) {
      const idUsuario = parseInt(idUsuarioString, 10);
      const api = `http://localhost:3000/usuarios/${idUsuario}`;

      this.http.get<any>(api).subscribe((res) => {
        if (Array.isArray(res.data)) {
          this.tickets = res.data.map((ticket: any) => {
            return {
              id: ticket.idTickets,
              objetos: ticket.objeto,
              cantidad: ticket.cantidad,
              direccion: ticket.direccion,
              dimensiones: ticket.dimensiones,
              idUsuario: ticket.usuarioIdUsuario,
              foto: ticket.foto
            };
          });

          console.log(this.tickets);
        } else {
          console.error('La respuesta no es una matriz:', res);
        }
      });
    }
    else if (idUsuarioEmpString !== null) {
      
      //trasnformar idusuarioEmp a numero
      const idUsuarioEmp = parseInt(idUsuarioEmpString, 10);
      console.log(idUsuarioEmp);

      const id = 1
      const api = `http://localhost:3000/usuarios/${id}`;
      // const api = `http://localhost:3000/usuariosEmp/${idUsuarioEmp}`;
      this.http.get<any>(api).subscribe((res) => {
        if (Array.isArray(res.data)) {
          this.tickets = res.data.map((ticket: any) => {
            return {
              id: ticket.idTickets,
              objetos: ticket.objeto,
              cantidad: ticket.cantidad,
              direccion: ticket.direccion,
              dimensiones: ticket.dimensiones,
              idUsuario: ticket.usuarioIdUsuario,
              foto: ticket.foto
            };
          });

          console.log(this.tickets);
        } else {
          console.error('La respuesta no es una matriz:', res);
        }
      });
    }
    else {
      alert('ocurrio un error al mostrar los tickets');
    }
  }
  

  // Reemplazar los caracteres que necesitas
  // const nuevaFoto = fotoBase64.replace('blob', 'blob:').replace(/\+/g, '-');
  // const nuevafoto2 = nuevaFoto.replace('http', 'http:')
  // console.log(nuevafoto2); // blob:http://localhost:8100/439867c3-9172-434f-be7e-8c9ad75702de
  // const fotoBase64 = btoa(String.fromCharCode(...new Uint8Array(ticket.foto.data)));
  // const fotoBlob = new Blob([fotoBase64], { type: 'image/jpeg' });
  // this.fotoUrl = URL.createObjectURL(fotoBlob);

  // const reader = new FileReader();
  // reader.readAsDataURL(fotoBlob);
  // reader.onloadend = () => {
  //   const base64data = reader.result as string;
  //   this.base64data = base64data;
  //   this.fotoUrl = base64data;
  //   console.log(this.base64data); // Base64 de la foto
  // };
  // this.blobToBase64(ticket.foto.data).then((base64data) => {
  //   this.base64data = base64data;
  //   this.fotoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';
  //   console.log(this.base64data); // Base64 de la foto
  // });

  // blobToBase64(blob: Blob): Promise<string> {
  //   return new Promise<string>((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64data = reader.result as string;
  //       resolve(base64data);
  //     };
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob);
  //   });
  // }


}