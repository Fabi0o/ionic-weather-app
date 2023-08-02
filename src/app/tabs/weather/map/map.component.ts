import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { locData } from 'src/app/weather-data.model';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map') mapRef!: ElementRef<HTMLElement>;
  @Input() geoLoc!: locData;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.onShowMap();
  }

  onShowMap() {
    this.mapService
      .createMap(this.geoLoc.lat, this.geoLoc.lon, this.mapRef)
      .then((newMap) => {
        newMap.addMarker({
          coordinate: { lat: this.geoLoc.lat, lng: this.geoLoc.lon },
        });
        this.mapService.map.next(newMap);
      });
  }
}
