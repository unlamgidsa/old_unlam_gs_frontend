import axios from "axios";

export default function SatelliteNames(
	urlBase,
	listParam,
	TlmyParam,
	openmct
) {
	axios
		.get(urlBase + listParam)
		.then(response => {
			return response.data.map(satellite => {
				return { name: satellite.code, key: "satellite" };
			});
		})
		.then(satellite => {
			for (let sat of satellite) {
				openmct.install(
					openmct.plugins.TelemetryDictionaryPlugin(
						sat.name,
						sat.key,
						urlBase + TlmyParam + sat.name
					)
				);
			}
		});
}
