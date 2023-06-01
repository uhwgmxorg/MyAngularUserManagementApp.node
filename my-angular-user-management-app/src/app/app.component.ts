import { Component } from '@angular/core';
import { environment } from '../app/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  version = environment.appVersion;
  title = 'my-angular-user-management-app';
}
