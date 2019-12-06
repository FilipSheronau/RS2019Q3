import state from '../state';

export default function (data) {
  state.location = data.city;
}
