import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import { SettingsService } from 'src/app/settings.service';
import { currentWeather } from 'src/app/weather-data.model';

@Component({
  selector: 'app-weather',
  templateUrl: 'weather.page.html',
  styleUrls: ['weather.page.scss'],
})
export class WeatherPage implements OnInit {
  constructor(private http: HttpService, private settings: SettingsService) {}

  ngOnInit(): void {
    this.settings.isCurrentDark$
      .pipe(take(1))
      .subscribe((isDark) => this.settings.changeColorScheme(isDark));
  }

  currentWeather!: Observable<currentWeather>;

  isLoading = this.http.isLoading;

  ionViewWillEnter(): void {
    this.currentWeather = this.http.currentWeather;
  }
}
