import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, delay, map, switchMap } from 'rxjs';
import { currentWeather, locData } from './weather-data.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  currentWeather!: Observable<currentWeather>;

  isLoading = new BehaviorSubject(false);

  getWeather(city: string) {
    let cityName: string;
    this.isLoading.next(true);
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
        delay(1500),
        map((weatherData) => {
          this.isLoading.next(false);
          weatherData.name = cityName;
          return weatherData;
        })
      );
  }
}
