import state from '../state';

export default function (resp) {
  const coords = resp.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
  const [lon, lat] = coords;
  state.coords.lat = lat;
  state.coords.lon = lon;

  state.city = resp.response.GeoObjectCollection.featureMember[0].GeoObject.name;
  state.country = resp.response.GeoObjectCollection.featureMember[0].GeoObject
    .metaDataProperty.GeocoderMetaData.AddressDetails.Country.CountryName;
  state.nameLocation = `${state.city}, ${state.country}`;
}
