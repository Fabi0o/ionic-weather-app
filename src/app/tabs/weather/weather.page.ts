import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import { currentWeather } from 'src/app/weather-data.model';

@Component({
  selector: 'app-weather',
  templateUrl: 'weather.page.html',
  styleUrls: ['weather.page.scss'],
})
export class WeatherPage {
  constructor(private http: HttpService) {}

  currentWeather!: Observable<currentWeather>;

  ionViewWillEnter(): void {
    this.currentWeather = this.http.currentWeather;
  }
}
