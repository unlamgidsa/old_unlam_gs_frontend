import axios from 'axios';

export default function HistoricalTelemetry(urlBase) {
  return function install(openmct) {
    var provider = getProvider(urlBase);
    openmct.telemetry.addProvider(provider);
  };
}

function getProvider(urlBase) {
  return {
    supportsRequest: function(domainObject) {
      return domainObject.type === 'sat.telemetry';
    },
    request: function(domainObject, options) {
      const name = parseNamespace(domainObject.identifier.namespace);
      var url = `${urlBase}${name}.${domainObject.name}/${options.start}/${options.end}`;

      return axios.get(url).then(function(resp) {
        return resp.data;
      });
    }
  };
}

function parseNamespace(namespace) {
  return namespace.replace('.telemetry', '');
}
