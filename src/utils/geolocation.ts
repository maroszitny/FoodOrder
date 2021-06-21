import Geocoder from 'react-native-geocoding';
import { mapKey } from '../config/config';
class GeoLocation {
  constructor() {
    Geocoder.init(mapKey);
  }

  getLatLng = (address: string = "") => {
    return new Promise((res, rej) => {
      Geocoder.from(address)
        .then(json => {
          const location = json.results[0].geometry.location;
          res(location);
        })
        .catch(error => {
          console.warn(error);
          rej(error);
        });
    });
  };
  getAddress = (lat, lng) => {
    return new Promise((res, rej) => {
      Geocoder.from(lat, lng)
        .then(json => {
          const addressComponent = json.results[0]['formatted_address'];
          res(addressComponent);
        })
        .catch(error => {
          console.warn(error);
          rej(error);
        });
    });
  };

  getPhoto = (ref) => {
    return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${mapKey}`
  }
}
export const GeoLocationService = new GeoLocation();
