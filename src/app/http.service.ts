import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { currentWeather, locData } from './weather-data.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private translate: TranslateService) {}

  currentWeather!: Observable<currentWeather>;

  isLoading = new BehaviorSubject(false);

  getWeatherByCityName(city: string) {
    let cityName: string;
    return this.http
      .get<locData[]>(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${environment.apiKey}`
      )
      .pipe(
        switchMap((geoLoc) => {
          if (!geoLoc[0])
            throw new Error(`Could not find city of name: ${city}`);
          cityName = geoLoc[0].name;
          return this.http.get<currentWeather>(
            `https://api.openweathermap.org/data/2.5/weather?lat=${geoLoc[0].lat}&lon=${geoLoc[0].lon}&units=metric&appid=${environment.apiKey}&lang=${this.translate.currentLang}`
          );
        }),
        map((weatherData) => {
          weatherData.name = cityName;
          return weatherData;
        })
      );
  }

  getWeatherByGeoLoc(geoLoc: locData) {
    const { lat, lon } = geoLoc;
    return this.http.get<currentWeather>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${environment.apiKey}&lang=${this.translate.currentLang}`
    );
  }

  setCurrentWeather(currWeather: Observable<currentWeather>) {
    return (this.currentWeather = currWeather);
  }
}
