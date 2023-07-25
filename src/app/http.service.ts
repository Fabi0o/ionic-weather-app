import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getWeather(city: string) {
    this.http
      .get<any>(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${environment.apiKey}`
      )
      .pipe(
        switchMap((data) => {
          console.log(data);
          return this.http.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${environment.apiKey}`
          );
        })
      )
      .subscribe((data) => console.log(data));
  }
}
