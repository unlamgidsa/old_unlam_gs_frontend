import axios from 'axios';

export default function SatelliteNames() {
  return axios.get('http://192.168.1.183:8000/API/SatelliteList').then(response => {
    return response.data.map(satellite => {
      return { name: satellite.code, key: 'satellite' };
    });
  });
}
