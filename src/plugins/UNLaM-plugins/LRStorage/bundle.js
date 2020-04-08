define([
	"./src/LocalStoragePersistenceProvider",
	"./src/LocalStorageIndicator"
], function (
	LocalStoragePersistenceProvider,
	LocalStorageIndicator
) {

	return {
		name:"src/plugins/UNLaM-plugins/LRStorage",
		definition: {
			"extensions": {
				"components": [
					{
						"provides": "persistenceService",
						"type": "provider",
						"implementation": LocalStoragePersistenceProvider,
						"depends": [
							"$window",
							"$q",
							"PERSISTENCE_SPACE"
						]
					}
				],
				"constants": [
					{
						"key": "PERSISTENCE_SPACE",
						"value": "mct"
					}
				],
				"indicators": [
					{
						"implementation": LocalStorageIndicator
					}
				]
			}
		}
	};
});
