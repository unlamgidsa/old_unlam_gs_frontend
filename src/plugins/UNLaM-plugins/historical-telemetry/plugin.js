import axios from 'axios';
import { parseNamespace } from '../telemetry-dictionary/plugin';

export default function HistoricalTelemetry() {
  return function install(openmct) {
    var provider = {
      supportsRequest: function(domainObject) {
        return domainObject.type === 'sat.telemetry';
      },
      request: function(domainObject, options) {
        const name = parseNamespace(domainObject.identifier.namespace);
        var url = `http://192.168.1.183:8000/API/TlmyVarList/${name}.${domainObject.name}/${options.start}/${options.end}`;

        return axios.get(url).then(function(resp) {
          return resp.data;
        });
      }
    };

    openmct.telemetry.addProvider(provider);
  };
}
