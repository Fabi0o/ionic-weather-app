import { ElementRef, Injectable } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map = new BehaviorSubject<GoogleMap>(null!);

  isMap = new BehaviorSubject(false);

  constructor(private translate: TranslateService) {}

  createMap(lat: number, lng: number, mapRef: ElementRef<HTMLElement>) {
    return GoogleMap.create({
      id: 'my-map',
      element: mapRef.nativeElement,
      apiKey: environment.apiKeyMaps,
      config: {
        center: {
          lat: lat,
          lng: lng,
        },
        zoom: 10,
      },
      language: this.translate.currentLang,
    });
  }
}
