import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  private _isCurrentDark$ = new BehaviorSubject<boolean>(this.prefersDark);

  private _currFontSize$ = new BehaviorSubject<'default' | 'big' | 'small'>(
    'default'
  );

  private _currLanguage$ = new BehaviorSubject<'default' | 'pl' | 'en'>(
    'default'
  );

  get isCurrentDark$() {
    return this._isCurrentDark$;
  }

  get currFontSize$() {
    return this._currFontSize$;
  }

  get currLanguage$() {
    return this._currLanguage$;
  }

  changeColorScheme(bool: boolean) {
    document.body.classList.toggle('dark', bool);
    this._isCurrentDark$.next(document.body.classList.contains('dark'));
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
