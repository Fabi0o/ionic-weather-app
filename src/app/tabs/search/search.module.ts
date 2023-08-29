import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchPage } from './search.page';
import { TranslateModule } from '@ngx-translate/core';

import { SearchPageRoutingModule } from './search-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    SearchPageRoutingModule,
    TranslateModule,
  ],
  declarations: [SearchPage],
})
export class SearchPageModule {}
