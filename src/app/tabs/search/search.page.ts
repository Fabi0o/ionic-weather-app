import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { catchError, of } from 'rxjs';
import { GeoLocService } from 'src/app/geo-loc.service';
import { HttpService } from 'src/app/http.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
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
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private translate: TranslateService
  ) {}

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
              let errorMess: string;
              this.translate
                .get('SEARCH.ERRORMESS', { city: this.form.value.cityName })
                .subscribe((res) => (errorMess = res));
              loadingEl.dismiss();
              this.alertCtrl
                .create({
                  header: 'Error',
                  message: errorMess!,
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
