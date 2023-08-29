import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { locData } from './weather-data.model';

@Injectable({
  providedIn: 'root',
})
export class GeoLocService {
  constructor() {}

  currentGeoLoc() {
    return Geolocation.getCurrentPosition().then<locData>((data) => {
      return {
        lat: data.coords.latitude,
        lon: data.coords.longitude,
        name: '',
      };
    });
  }
}
