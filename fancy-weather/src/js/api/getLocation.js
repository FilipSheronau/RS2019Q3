import Query from '../query';
import state from '../state';

export default async function getLocation() {
  const query = new Query('https://ipinfo.io/', { token: '80c45108f4ef46' });
  const result = await query.getData();
  state.location = result.city;
}
