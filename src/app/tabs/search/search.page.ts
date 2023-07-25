import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private httpService: HttpService, private router: Router) {}

  onSubmit() {
    if (this.form.valid) {
      this.httpService.getWeather(this.form.value.cityName!);
      this.form.reset();
      this.router.navigateByUrl('tabs/weather');
    }
  }
}
