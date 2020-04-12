import axios from 'axios';

export default function SatelliteNames(url) {
  return axios.get(url).then(response => {
    return response.data.map(satellite => {
      return { name: satellite.code, key: 'satellite' };
    });
  });
}