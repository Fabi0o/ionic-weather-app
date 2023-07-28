import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { catchError, of, take } from 'rxjs';
import { GeoLocService } from 'src/app/geo-loc.service';
import { HttpService } from 'src/app/http.service';
import { SettingsService } from 'src/app/settings.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage implements OnInit {
  form = new FormGroup({
    cityName: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)],
    }),
  });

  constructor(
    private httpService: HttpService,
    private router: Router,
    private geoLoc: GeoLocService,
    private settings: SettingsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.settings.isCurrentDark$
      .pipe(take(1))
      .subscribe((isDark) => this.settings.changeColorScheme(isDark));
  }

  onSubmit() {
    if (this.form.valid) {
      this.loadingCtrl.create().then((loadingEl) => {
        loadingEl.present();

        this.httpService
          .setCurrentWeather(
            this.httpService.getWeatherByCityName(this.form.value.cityName!)
          )
          .pipe(
            catchError((err) => {
              return of(err);
            })
          )
          .subscribe((data) => {
            if (!data.stack) {
              loadingEl.dismiss();
              this.form.reset();
              this.router.navigateByUrl('tabs/weather');
            } else {
              loadingEl.dismiss();
              this.alertCtrl
                .create({
                  header: 'Error',
                  message: `Could not find city of name ${this.form.value.cityName}`,
                  buttons: ['OK'],
                })
                .then((alertEl) => {
                  alertEl.present();
                  alertEl.onDidDismiss().then(() => this.form.reset());
                });
            }
          });
      });
    }
  }

  onGetGeoLoc() {
    this.loadingCtrl.create().then((laodingEl) => {
      laodingEl.present();

      this.geoLoc.currentGeoLoc().then((geoLoc) => {
        this.httpService.setCurrentWeather(
          this.httpService.getWeatherByGeoLoc(geoLoc)
        );

        laodingEl.dismiss();
        this.form.reset();
        this.router.navigateByUrl('tabs/weather');
      });
    });
  }
}
