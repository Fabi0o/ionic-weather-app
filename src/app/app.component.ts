import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { HttpService } from './http.service';
import { GeoLocService } from './geo-loc.service';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './settings.service';
import { Preferences } from '@capacitor/preferences';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private http: HttpService,
    private geoLoc: GeoLocService,
    private translate: TranslateService,
    private settings: SettingsService
  ) {
    Preferences.get({ key: 'font-size' }).then((res) => {
      if (res.value)
        this.settings.setFontSize(res.value as 'small' | 'default' | 'big');
    });

    Preferences.get({ key: 'color' }).then((res) => {
      if (res.value) {
        this.settings.changeColorScheme(
          res.value as 'dark' | 'light' | 'default'
        );
      } else this.settings.changeColorScheme('default');
    });

    translate.setDefaultLang('en');
    Preferences.get({ key: 'language' }).then((res) => {
      if (res.value) {
        this.settings.changeLanguage(res.value as 'pl' | 'en' | 'default');
      } else translate.use(translate.defaultLang);
    });

    this.initializeApp();
  }

  initializeApp() {
    LocalNotifications.requestPermissions();
    LocalNotifications.checkPermissions().then((perm) => {
      if (perm.display === 'denied') return;
      this.geoLoc.currentGeoLoc().then((geoLoc) => {
        let notiTitle: string;
        this.translate
          .get('NOTITITLE')
          .pipe(
            switchMap((title) => {
              notiTitle = title;
              return this.http.getWeatherByGeoLoc(geoLoc);
            })
          )
          .subscribe((weather) => {
            LocalNotifications.schedule({
              notifications: [
                {
                  title: `${notiTitle} ${weather.name}`,
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
