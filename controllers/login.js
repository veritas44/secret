define(['backbone', 'router', 'models/user'], function(Backbone, router, user) {


	var Controller = function(path) {


		
		require(['views/login'], function(LoginView) {
			new LoginView();
		});



	}





	return Controller;

});