define(
	["../../http-server/service.js"],
	function (http) {

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
		function LocalStoragePersistenceProvider($window, $q, $http, space, url) {
			this.$q = $q;
			this.$http = $http;
			this.space = space;
			this.url = url;
			this.spaces = space ? [space] : [];
			this.localStorage = $window.localStorage;
		}

		/**
		 * Set a value in local storage.
		 * @private
		 */
		LocalStoragePersistenceProvider.prototype.setValue = function (key, value) {
			this.localStorage[key] = JSON.stringify(value);
			//this.$http({
			//	method: "PUT",
			//	url: this.url,
			//	data: value
			//});
			//http.httpPut(this.url, value).then(res => console.log(res));
		};

		/**
		 * Get a value from local storage.
		 * @private
		 */
		LocalStoragePersistenceProvider.prototype.getValue = function (key) {
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
			return this.$http({ // cambiar por el httpGet de http para el usuario
				method: "GET",
				url: this.url
			}).then(response => {
				//this.localStorage[space] = JSON.stringify(response.data);
				//return response.data[key];
				let resData = response.data,
					localData = this.getValue(space),
					spaceObj = {...localData, ...resData};
				spaceObj.mine.composition = [...localData.mine.composition, ...resData.mine.composition].unique();
				return spaceObj[key];
			}, error => {
				var spaceObj = this.getValue(space);
				return spaceObj[key];
			});
		};

		LocalStoragePersistenceProvider.prototype.deleteObject = function (space, key) {
			var spaceObj = this.getValue(space);
			delete spaceObj[key];
			this.setValue(space, spaceObj);
			return this.$q.when(true);
		};

		LocalStoragePersistenceProvider.prototype.updateObject =
			LocalStoragePersistenceProvider.prototype.createObject;

		Array.prototype.unique = function() {
    var a = this.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

		return LocalStoragePersistenceProvider;
	}
);
