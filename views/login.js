define(['backbone', 'text!templates/login/form.hbs', 'handlebars', 'models/user', 'router'], 
	function(Backbone, template, Handlebars, user, router) {

	var View = Backbone.View.extend({

		el: document.body,

		events: {
			'click #signin': 'signin',
		},

		initialize: function() {
			this.template = Handlebars.compile(template);
			this.render();
		},
		render: function() {
			this.$el.html(this.template({}));
		},
		signin: function(event) {

			event.preventDefault();

			var _self = this;

			var login = this.$el.find('#email').val();
			var pass  = this.$el.find('#password').val();

			if (login && pass) {


				var process = new Promise(function(done) {

					_self.$el
						.find('#signin')
						.html('<i class="fa fa-refresh fa-spin"></i> Generating keys')
						.addClass('disabled');

					setTimeout(done, 500);
				})

				process
					.then(function() {
						return user.login(login, pass);
					})
					.then(function() {
						_self.$el
							.find('#signin')
							.html('<i class="fa fa-check"></i> Success');

						setTimeout(function() {
							router.navigate('/', { trigger: true });
						}, 500)
					});
			}

		}





	});


	return View;



});