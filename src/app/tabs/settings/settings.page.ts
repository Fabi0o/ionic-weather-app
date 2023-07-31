import { Component } from '@angular/core';
import { SettingsService } from 'src/app/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {
  constructor(private settings: SettingsService) {}

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
