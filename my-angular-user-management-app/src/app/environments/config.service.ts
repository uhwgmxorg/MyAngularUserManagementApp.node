import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = 'config.json';
  public config: any;

  constructor(private http: HttpClient) { }

  loadConfig(): Promise<any> {
    return this.http.get(this.configUrl)
      .toPromise()
      .then((data: any) => {
        this.config = data;
      });
  }
}
