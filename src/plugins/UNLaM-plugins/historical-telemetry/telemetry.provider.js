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
				if (resp.data.length === 0) {
					// hay que cambiar este hardcodeo cuando este implementado
					// en el backend.
					url = `${urlBase}${name}.${domainObject.name}/1531958932000/1539734400000`;
					return axios.get(url).then(newResp => {
						let histData = newResp.data;
						console.log(histData);
						if (histData.length != 0) {
							let first = histData[0].timestamp,
								last = histData[histData.length - 1].timestamp;
							openmct.time.bounds({start: first, end: last});
							return histData;
						}
								return [];
					});
				}
        return resp.data;
      });
    }
  };
}

function parseNamespace(namespace) {
  return namespace.replace('.telemetry', '');
}
