define(['backbone'], function(Backbone) {

	var Router = Backbone.Router.extend({


		routes: {
			''      : 'index',
			':controller(/*path)' : 'controller',
		},

		initialize: function() {

			Backbone.history.start({pushState: true});

		},
		controller: function(controller, path) {

			this.loader(controller)
				.then(function(Controller) {
					Controller(path);
				});
			
		},
		index: function() {
			require(['controllers/index']);
		},


		loader: function(controller) {

			return new Promise(function(done) {
				require(['controllers/'+controller], function(Controller) {
					done(Controller);
				});
			});

		}


	});




	var router = router || new Router();

	return router;

});