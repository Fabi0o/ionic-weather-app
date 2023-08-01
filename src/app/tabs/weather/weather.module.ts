import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherPage } from './weather.page';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { WeatherPageRoutingModule } from './weather-routing.module';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WeatherPageRoutingModule,
    TranslateModule,
  ],
  declarations: [WeatherPage, MapComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WeatherPageModule {}
