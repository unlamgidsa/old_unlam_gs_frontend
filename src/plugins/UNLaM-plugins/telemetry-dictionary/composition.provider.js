import { getDictionary } from './plugin.js';

export function getCompositionProvider(namespace) {
  return {
    appliesTo: function(domainObject) {
      return compositionAppliesTo(domainObject, namespace);
    },
    load: function(domainObject) {
      return loadMetadata(domainObject);
    }
  };
}

function compositionAppliesTo(domainObject, namespace) {
  return domainObject.identifier.namespace === namespace && domainObject.type === 'folder';
}

function loadMetadata(domainObject) {
  return getDictionary(domainObject.identifier.namespace).then(dictionary =>
    mapMetadata(dictionary, domainObject)
  );
}

function mapMetadata(dictionary, domainObject) {
  return dictionary.measurements.map(m => {
    return {
      namespace: domainObject.identifier.namespace,
      key: m.key
    };
  });
}
