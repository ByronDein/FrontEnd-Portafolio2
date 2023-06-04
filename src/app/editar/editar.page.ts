import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  formAct: FormGroup;
  constructor(public fb: FormBuilder,private router: Router, private http: HttpClient, private alertController: AlertController) {
    this.formAct = this.fb.group({
      'nombre' : new FormControl("", Validators.required),
      'password' : new FormControl ("", Validators.required),
      'direccion' : new FormControl ("", Validators.required),
      'telefono' : new FormControl ("", Validators.required),
      'comunac' : new FormControl ("", Validators.required)
    })
   }
   async actualizar(){

   }

  ngOnInit() {
  }

}
