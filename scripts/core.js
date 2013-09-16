$(document).ready(function(){

	(function(){
		window.App = {
			Models: {},
			Collections:{},
			View:{},
			Router:{}
		};
		
		App.Router = Backbone.Router.extend({
			routes: {
				'': 'showDefault',
				'page/:id': 'showPage' 
			},
			
			showDefault: function() {
				$('#main').append('Default route has been called.');
			},

			showPage: function(id) {
				$('#main').append('Show page route has been call with id equals:' + id);
			}
		});
		
		new App.Router;
		Backbone.history.start();
	})();
});