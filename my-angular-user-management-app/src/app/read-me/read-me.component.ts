import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-read-me',
  templateUrl: './read-me.component.html',
  styleUrls: ['./read-me.component.scss']
})
export class ReadMeComponent {
  version = environment.appVersion;
  constructor() {
    console.log(this.version);
  }
}
