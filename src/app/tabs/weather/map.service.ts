import { Injectable } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map = new BehaviorSubject<GoogleMap>(null!);

  constructor() {}
}
