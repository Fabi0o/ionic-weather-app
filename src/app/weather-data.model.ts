export interface locData {
  lat: number;
  lon: number;
  name: string;
}

interface weather {
  id: number;
  description: string;
  icon: string;
}

interface main {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface wind {
  deg: number;
  gust: number;
  speed: number;
}

export interface currentWeather {
  id: number;
  coord: locData;
  weather: weather[];
  name: string;
  main: main;
  visibility: number;
  wind: wind;
}
