export interface LocationData {
  id: number;
  location_name: string;
  city: string;
  state: string;
  state_abbr: string;
  address: string;
  premium: number;
  showpopular: number;
  opusowned: number;
  point_x: number;
  point_y: number;
  image: {
    url: string;
    alttext: string | null;
  };
  url: string;
  phone: string;
}
