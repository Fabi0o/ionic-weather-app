import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map, switchMap } from 'rxjs';
import { currentWeather, locData } from './weather-data.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  currentWeather!: Observable<currentWeather>;

  getWeather(city: string) {
    let cityName: string;
    this.currentWeather = this.http
      .get<locData[]>(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${environment.apiKey}`
      )
      .pipe(
        switchMap((geoLoc) => {
          cityName = geoLoc[0].name;
          return this.http.get<currentWeather>(
            `https://api.openweathermap.org/data/2.5/weather?lat=${geoLoc[0].lat}&lon=${geoLoc[0].lon}&units=metric&appid=${environment.apiKey}`
          );
        }),
        map((weatherData) => {
          weatherData.name = cityName;
          return weatherData;
        })
      );
  }
}
