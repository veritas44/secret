define(['backbone', 'store', 'cryptico', 'SHA256'], function(Backbone, store, cryptico, SHA256) {


	var User = Backbone.Model.extend({

		defaults: {
			id         :  null,
			privateKey :  null,
			publicKey  :  null,
			username   :  null
		},

		save: function () {

			console.log(this);

			//store.set('User', this.toJSON());
		
		},

		load: function() {

		//	if (store.has('User')) this.set(store.get('User'));

		},


		initialize: function() {

			this.load();
			this.on('change', this.save, this);

			this.login('testdfsdf', 'dsfsdfsdfsd');

		},

		isLogin: function() {

			return (this.get('id') && this.get('privateKey') && this.get('publicKey'))
				? true
				: false;

		},

		login: function(email, password) {

			var _self = this;

			this.generateHash(email, password)
				.then(_self.generatePrivateKey())
				.then(_self.generatePublicKey())
				.then(_self.trigger('login'));
			

		},

		generateHash: function(email, password) {

			var _self = this;

			return new Promise(function(done) {

				var hash = SHA256('secret:' + email + password );

				_self.set('id', hash);

				done();
				
			});

		},

		generatePrivateKey: function () {

			var _self = this;

			return new Promise(function(done) {

				var key = cryptico.generateRSAKey(_self.get('id'), 3072);

				_self.set('privateKey', key);

				done();

			});

		},

		generatePublicKey: function() {

			var _self = this;

			return new Promise(function(done) {

				var key = cryptico.publicKeyString(_self.get('privateKey'));

				_self.set('publicKey', key);

				done();

			});

		}

	});

	var user = window.user = user || new User();

	return user;



});
