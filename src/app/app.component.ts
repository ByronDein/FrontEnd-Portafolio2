import { Component } from '@angular/core';
import {Cloudinary} from '@cloudinary/url-gen'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  ngOnInit() {
    const cld = new Cloudinary({cloud: {cloudName: 'dt2xfnusc'}});
  }

}
