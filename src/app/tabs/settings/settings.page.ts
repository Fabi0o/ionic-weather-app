import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { SettingsService } from 'src/app/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(private settings: SettingsService) {}

  ngOnInit(): void {
    this.settings.isCurrentDark$
      .pipe(take(1))
      .subscribe((isDark) => this.settings.changeColorScheme(isDark));
  }

  onChangeTheme(event: CustomEvent) {
    let currentColor;

    this.settings.isCurrentDark$
      .pipe(take(1))
      .subscribe(
        (currentScheme) => (currentColor = currentScheme ? 'dark' : 'light')
      );

    if (event.detail.value == 'default') {
      event.detail.value = this.settings.prefersDark ? 'dark' : 'light';
    }
    this.settings.changeColorScheme(event.detail.value !== 'light');
  }
}
