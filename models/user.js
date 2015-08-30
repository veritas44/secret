define(['backbone', 'store', 'cryptico', 'SHA256'], function(Backbone, store, cryptico, SHA256) {


	var User = Backbone.Model.extend({

		defaults: {
			id         :  null,
			privateKey :  null,
			publicKey  :  null,
			username   :  null
		},

		save: function () {

			store.set('User', this.toJSON());
		
		},

		load: function() {

			if (store.has('User')) this.set(store.get('User'));

		},


		initialize: function() {


			this.load();
			
			this.on('change', this.save, this);


		},

		isLogin: function() {

			return (this.get('id') && this.get('privateKey') && this.get('publicKey'))
				? true
				: false;

		},

		login: function(email, password) {

			var _self = this;

			return new Promise(function(done) {
				_self.generateHash(email, password)
					.then(_self.generatePrivateKey())
					.then(_self.generatePublicKey())
					.then(done());
			});

			
		},

		generateHash: function(email, password) {


			var _self = this;

			return new Promise(function(done) {

				var hash = SHA256('secret:' + email + password );

				_self.set('id', hash);

				console.log('hash');

				done(_self);
				
			});

		},

		generatePrivateKey: function () {

			var _self = this;

			return new Promise(function(done) {

				var key = cryptico.generateRSAKey(_self.get('id'), 768);

				_self.set('privateKey', key);

				console.log('private');

				done();

			});

		},

		generatePublicKey: function() {

			var _self = this;

			return new Promise(function(done) {

				var key = cryptico.publicKeyString(_self.get('privateKey'));

				console.log('public');

				_self.set('publicKey', key);

				done();

			});

		}

	});

	var user = window.user = user || new User();

	return user;



});
