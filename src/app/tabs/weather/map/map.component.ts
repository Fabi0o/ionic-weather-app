import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { locData } from 'src/app/weather-data.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  @Input() geoLoc!: locData;

  newMap!: GoogleMap;

  isLoaded = false;

  constructor() {}

  onShowMap() {
    this.createMap().then((newMap) => {
      newMap.addMarker({
        coordinate: { lat: this.geoLoc.lat, lng: this.geoLoc.lon },
      });
      this.isLoaded = true;
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
    }));
  }
}
