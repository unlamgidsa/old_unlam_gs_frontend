define(
	[],
	function () {

		/**
		 * The LocalStoragePersistenceProvider reads and writes JSON documents
		 * (more specifically, domain object models) to/from the browser's
		 * local storage.
		 * @memberof platform/persistence/local
		 * @constructor
		 * @implements {PersistenceService}
		 * @param q Angular's $q, for promises
		 * @param $interval Angular's $interval service
		 * @param {string} space the name of the persistence space being served
		 */
		function LocalStoragePersistenceProvider($window, $q, space) {
			this.$q = $q;
			this.space = space;
			this.spaces = space ? [space] : [];
			this.localStorage = $window.localStorage;
		}

		/**
		 * Set a value in local storage.
		 * @private
		 */
		LocalStoragePersistenceProvider.prototype.setValue = function (key, value) {
			this.localStorage[key] = JSON.stringify(value);
			console.log("Se acaba de guardar un objeto");
		};

		/**
		 * Get a value from local storage.
		 * @private
		 */
		LocalStoragePersistenceProvider.prototype.getValue = function (key) {
			console.log("Se acaba de obtener un objeto");
			return this.localStorage[key] ?
				JSON.parse(this.localStorage[key]) : {};
		};

		LocalStoragePersistenceProvider.prototype.listSpaces = function () {
			return this.$q.when(this.spaces);
		};

		LocalStoragePersistenceProvider.prototype.listObjects = function (space) {
			return this.$q.when(Object.keys(this.getValue(space)));
		};

		LocalStoragePersistenceProvider.prototype.createObject = function (space, key, value) {
			var spaceObj = this.getValue(space);
			spaceObj[key] = value;
			this.setValue(space, spaceObj);
			return this.$q.when(true);
		};

		LocalStoragePersistenceProvider.prototype.readObject = function (space, key) {
			var spaceObj = this.getValue(space);
			return this.$q.when(spaceObj[key]);
		};

		LocalStoragePersistenceProvider.prototype.deleteObject = function (space, key) {
			var spaceObj = this.getValue(space);
			delete spaceObj[key];
			this.setValue(space, spaceObj);
			return this.$q.when(true);
		};

		LocalStoragePersistenceProvider.prototype.updateObject =
			LocalStoragePersistenceProvider.prototype.createObject;

		return LocalStoragePersistenceProvider;
	}
);
