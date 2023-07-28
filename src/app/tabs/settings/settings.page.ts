import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { SettingsService } from 'src/app/settings.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(
    private settings: SettingsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.settings.isCurrentDark$
      .pipe(take(1))
      .subscribe((isDark) => this.settings.changeColorScheme(isDark));
  }

  defaultLang = this.translate.getDefaultLang();

  onChangeTheme(event: CustomEvent) {
    let currentColor;

    this.settings.isCurrentDark$
      .pipe(take(1))
      .subscribe(
        (currentScheme) => (currentColor = currentScheme ? 'dark' : 'light')
      );

    if (event.detail.value === 'default') {
      event.detail.value = this.settings.prefersDark ? 'dark' : 'light';
    }
    this.settings.changeColorScheme(event.detail.value !== 'light');
  }

  onChangeFontSize(event: CustomEvent) {
    this.settings.setFontSize(event.detail.value);
  }

  onChangeLang(event: CustomEvent) {
    if (event.detail.value === 'default') this.translate.use(this.defaultLang);
    else this.translate.use(event.detail.value);
  }
}
