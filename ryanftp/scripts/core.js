$(document).ready(function(){
	(function(){
		var App = window.App = {
			Models: {},
			Collections:{},
			Views:{},
			Routers:{}
		};

		_(App).extend(Backbone.Events);

		// Declaring model
		App.Models.Post = Backbone.Model.extend({});

		// Declaring collection
		App.Collections.Blog = Backbone.Collection.extend({
			model: App.Models.Post,
			url: './ryanftp/json/posts.json'
		});

		// Declaring Blog View
		App.Views.Blog = Backbone.View.extend({
			el: '<ul>',
			initialize: function() {
				//_.bindAll('reset');
				var self = this;
				this.collection = new App.Collections.Blog();
				this.collection.on('reset', this.render, this);
				this.collection.fetch({
					success: function(collection, response) {
					    _.each(collection.models, function(model) {
					      console.log(model.toJSON());

					    });
					    self.render();
					},
					error: function(model, xhr, options){
				       alert('Error on fetch');
				       console.log(xhr.responseText);
				    }
				});
			},
			render: function() {
				var self = this;
				_.each(this.collection.models, function(model, index){
					var li = $('<li>'),
						title = $('<h1>').text(model.get('posts')[0].title);
						content = $('<div>').html(model.get('posts')[0].content);

					self.$el.append(li.append(title).append(content));
					
				});
				return this;
			}
		});

		App.Routers.Main = Backbone.Router.extend({
			initialize: function(el) {
				this.el = el;
				this.blogView = new App.Views.Blog();
			},
			currentView: null,

			switchView: function(view) {
				if (this.currentView) {
					// Detach the old view
					this.currentView.remove();
				}

				// Move the view element into the DOM (replacing the old content)
				this.el.html(view.el);

				// Render view after it is in the DOM (styles are applied)
				view.render();

				this.currentView = view;
			},
			routes: {
				'': "showBlog"
			},
			showBlog: function() {
				this.switchView(this.blogView);
			}
		});

		var router = new App.Routers.Main($('#main'));
		Backbone.history.start();
	})();
});