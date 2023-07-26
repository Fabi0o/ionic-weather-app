import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeoLocService } from 'src/app/geo-loc.service';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
})
export class SearchPage {
  form = new FormGroup({
    cityName: new FormControl('', {
      updateOn: 'change',
      validators: [Validators.required],
    }),
  });

  constructor(
    private httpService: HttpService,
    private router: Router,
    private geoLoc: GeoLocService
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.httpService.getWeatherByCityName(this.form.value.cityName!);
      this.form.reset();
      this.router.navigateByUrl('tabs/weather');
    }
  }

  onGetGeoLoc() {
    this.geoLoc.currentGeoLoc().then((geoLoc) => {
      this.httpService.getWeatherByGeoLoc(geoLoc);
      this.form.reset();
      this.router.navigateByUrl('tabs/weather');
    });
  }
}
