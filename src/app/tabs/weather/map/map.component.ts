import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { TranslateService } from '@ngx-translate/core';
import { locData } from 'src/app/weather-data.model';
import { environment } from 'src/environments/environment';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  @Input() geoLoc!: locData;

  newMap!: GoogleMap;

  constructor(
    private translate: TranslateService,
    private mapService: MapService
  ) {}

  onShowMap() {
    this.createMap().then((newMap) => {
      newMap.addMarker({
        coordinate: { lat: this.geoLoc.lat, lng: this.geoLoc.lon },
      });
      this.mapService.map.next(newMap);
    });
  }

  async createMap() {
    return (this.newMap = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKeyMaps,
      config: {
        center: {
          lat: this.geoLoc.lat,
          lng: this.geoLoc.lon,
        },
        zoom: 10,
      },
      language: this.translate.currentLang,
    }));
  }
}
