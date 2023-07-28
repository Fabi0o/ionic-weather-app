import { Component } from '@angular/core';
import { take } from 'rxjs';
import { SettingsService } from 'src/app/settings.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {
  constructor(
    private settings: SettingsService,
    private translate: TranslateService
  ) {}

  currFontSize$ = this.settings.currFontSize$;

  currLanguage$ = this.settings.currLanguage$;

  currColor$ = this.settings.currentColor$;

  onChangeTheme(event: CustomEvent) {
    this.settings.changeColorScheme(event.detail.value);
  }

  onChangeFontSize(event: CustomEvent) {
    this.settings.setFontSize(event.detail.value);
  }

  onChangeLang(event: CustomEvent) {
    this.settings.changeLanguage(event.detail.value);
  }
}
