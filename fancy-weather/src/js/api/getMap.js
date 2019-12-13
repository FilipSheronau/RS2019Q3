import state from '../state';

export default function () {
  return `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${state.coords.lon},${state.coords.lat},8.9/250x250?access_token=pk.eyJ1IjoiZmlsc2hlciIsImEiOiJjazQzOTBwN2owNTI4M2xwam96ODhpcHM3In0.OVBi1px8wUu-9VMLvHbcxA`;
}
