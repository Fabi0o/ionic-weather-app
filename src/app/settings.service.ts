import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  private _isCurrentDark$ = new BehaviorSubject<boolean>(this.prefersDark);

  get isCurrentDark$() {
    return this._isCurrentDark$;
  }

  changeColorScheme(bool: boolean) {
    document.body.classList.toggle('dark', bool);
    this._isCurrentDark$.next(document.body.classList.contains('dark'));
  }

  setFontSize(size: 'small' | 'default' | 'big') {
    document.body.classList.toggle('big-font', size === 'big');
    document.body.classList.toggle('small-font', size === 'small');
  }

  constructor() {}
}
