import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherPage } from './weather.page';
import { TranslateModule } from '@ngx-translate/core';

import { WeatherPageRoutingModule } from './weather-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WeatherPageRoutingModule,
    TranslateModule,
  ],
  declarations: [WeatherPage],
})
export class WeatherPageModule {}
