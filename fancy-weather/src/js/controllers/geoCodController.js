import state from '../state';
import generic from './genericController';

export default function (resp) {
  const coords = resp.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
  const [lon, lat] = coords;
  state.coords.lat = lat;
  state.coords.lon = lon;
  const [latVal, lonVal] = generic.ddToDms(state.coords.lat, state.coords.lon);
  state.coords.latFormat = latVal;
  state.coords.lonFormat = lonVal;

  state.city = resp.response.GeoObjectCollection.featureMember[0].GeoObject.name;
  state.country = resp.response.GeoObjectCollection.featureMember[0].GeoObject
    .metaDataProperty.GeocoderMetaData.AddressDetails.Country.CountryName;
  state.nameLocation = `${state.city}, ${state.country}`;
  state.nameLocationEn = `${state.city}, ${state.country}`;
}
