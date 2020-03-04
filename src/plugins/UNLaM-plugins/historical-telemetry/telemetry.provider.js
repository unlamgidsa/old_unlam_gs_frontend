import axios from 'axios';

export class TelemetryProvider {
  constructor(openmct, urlBase) {
    this._openmct = openmct;
    this._urlBase = urlBase;
  }

  addProvider() {
    this._openmct.telemetry.addProvider(getProvider(this._urlBase));
  }
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
