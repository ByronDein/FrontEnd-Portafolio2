import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  tickets: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {

    const idUsuarioString = localStorage.getItem('IdUsuario');
    if (idUsuarioString !== null) {
    const idUsuario = parseInt(idUsuarioString, 10);
    const api = `http://localhost:3000/usuarios/${idUsuario}`;

    this.http.get<any>(api).subscribe((res) => {
      if (Array.isArray(res.data)) {
        this.tickets = res.data.map((ticket:any) => ({
          id: ticket.idTickets,
          objetos: ticket.objeto,
          cantidad: ticket.cantidad,
          direccion: ticket.direccion,
          dimensiones: ticket.dimensiones,
          idUsuario: ticket.usuarioIdUsuario,
        }));
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
}