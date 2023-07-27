import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { HttpService } from './http.service';
import { GeoLocService } from './geo-loc.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpService, private geoLoc: GeoLocService) {
    this.initializeApp();
  }

  initializeApp() {
    LocalNotifications.requestPermissions();
    LocalNotifications.checkPermissions().then((perm) => {
      if (perm.display === 'denied') return;
      this.geoLoc.currentGeoLoc().then((geoLoc) => {
        this.http.getWeatherByGeoLoc(geoLoc).subscribe((weather) => {
          LocalNotifications.schedule({
            notifications: [
              {
                title: `Current weather in ${weather.name}`,
                body: `Temp: ${Math.floor(
                  weather.main.temp
                )}°C Min temp: ${Math.floor(
                  weather.main.temp_min
                )}°C Max temp: ${Math.floor(weather.main.temp_max)}°C ${
                  weather.weather[0].description
                }`,
                id: 1,
                schedule: { every: 'second', count: 10, repeats: true },
              },
            ],
          });
        });
      });
    });
  }
}
