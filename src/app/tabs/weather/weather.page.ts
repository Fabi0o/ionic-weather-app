import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import { currentWeather } from 'src/app/weather-data.model';
import { MapService } from './map.service';

@Component({
  selector: 'app-weather',
  templateUrl: 'weather.page.html',
  styleUrls: ['weather.page.scss'],
})
export class WeatherPage {
  constructor(private http: HttpService, private mapService: MapService) {}

  isMap = this.mapService.isMap;

  currentWeather!: Observable<currentWeather>;

  ionViewWillEnter(): void {
    this.currentWeather = this.http.currentWeather;
    this.isMap.next(true);
  }
  ionViewWillLeave() {
    this.isMap.next(false);
    this.mapService.map.pipe(take(1)).subscribe((map) => {
      if (map) {
        map.destroy();
        this.mapService.map.next(null!);
      }
    });
  }
}
