import axios from 'axios';
import { getCompositionProvider } from './composition.provider.js';
import { getObjectProvider } from './object.provider.js';

export default function TelemetryDictionaryPlugin(name, key) {
  const namespace = name + '.telemetry';
  return function install(openmct) {
    const objects = openmct.objects;
    const composition = openmct.composition;

    objects.addRoot({
      namespace: namespace,
      key: key
    });

    objects.addProvider(namespace, getObjectProvider(namespace, key));
    composition.addProvider(getCompositionProvider(namespace));
  };
}

export function getDictionary(namespace) {
  const url = 'http://192.168.1.183:8000/API/TlmyVarDict/' + parseNamespace(namespace);
  return axios.get(url).then(data => data.data);
}

export function parseNamespace(namespace) {
  return namespace.replace('.telemetry', '');
}
