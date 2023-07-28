import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  defaultColor: 'dark' | 'light' = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
    ? 'dark'
    : 'light';

  private _currColor$ = new BehaviorSubject<'dark' | 'light' | 'default'>(
    this.defaultColor
  );

  private _currFontSize$ = new BehaviorSubject<'default' | 'big' | 'small'>(
    'default'
  );

  private _currLanguage$ = new BehaviorSubject<'default' | 'pl' | 'en'>(
    'default'
  );

  get currentColor$() {
    return this._currColor$;
  }

  get currFontSize$() {
    return this._currFontSize$;
  }

  get currLanguage$() {
    return this._currLanguage$;
  }

  async changeColorScheme(color: 'dark' | 'light' | 'default') {
    await Preferences.set({
      key: 'color',
      value: color,
    });
    this._currColor$.next(color);
    if (color === 'default') color = this.defaultColor;
    document.body.classList.toggle('dark', 'dark' === color);
  }

  async setFontSize(size: 'small' | 'default' | 'big') {
    await Preferences.set({ key: 'font-size', value: size });
    this._currFontSize$.next(size);
    document.body.classList.toggle('big-font', size === 'big');
    document.body.classList.toggle('small-font', size === 'small');
  }

  async changeLanguage(lang: 'pl' | 'en' | 'default') {
    await Preferences.set({ key: 'language', value: lang });
    this.currLanguage$.next(lang);
    if (lang === 'default') this.translate.use(this.translate.getDefaultLang());
    else this.translate.use(lang);
  }

  constructor(private translate: TranslateService) {}
}
