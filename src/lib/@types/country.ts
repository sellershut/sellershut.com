export interface Country {
  value: string;
  label: string;
  icon: string;
  coordinates: {
    lat: number;
    lo: number;
  };
  region: string;
}
