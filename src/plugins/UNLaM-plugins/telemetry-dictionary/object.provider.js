import { getDictionary } from './plugin.js';

export function getObjectProvider(namespace, key) {
  return {
    get: function(identifier) {
      return getMetadata(identifier, namespace, key);
    }
  };
}

function getMetadata(identifier, namespace, key) {
  return getDictionary(namespace).then(dictionary =>
    defineMetadata(identifier, namespace, key, dictionary)
  );
}

function defineMetadata(identifier, namespace, key, dictionary) {
  if (identifier.key === key) {
    return {
      identifier: identifier,
      name: dictionary.name,
      type: 'folder',
      location: 'ROOT'
    };
  } else {
    const measurement = dictionary.measurements.filter(m => {
      return m.key === identifier.key;
    })[0];
    return {
      identifier: identifier,
      name: measurement.name,
      type: 'sat.telemetry',
      telemetry: {
        values: measurement.values
      },
      location: `${namespace}:${key}`
    };
  }
}
