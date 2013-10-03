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

		// Declaring collection factory
		var collectionFactory = function (url) {
			 var Blog =Backbone.Collection.extend({
						model: App.Models.Post,
						url: url
					});
			 return new Blog();
		}

		// Declaring Blog View
		App.Views.Main = Backbone.View.extend({
			el: '<div>',
			initialize: function() {
				this.$el.attr('id', 'mainView');
			},
			render: function() {
				var self = this,
					nav = $('<div>', { 'id': 'navigation' }),
					page = $('<div>', { 'id': 'page' });
				
				
				// build navigation
				var interestsLink = $('<a>', {'href': '#interests'}).text('Interests'),
					workLink = $('<a>', {'href': '#work'}).text('Work');

				nav.append(interestsLink);
				nav.append(workLink);

				self.$el.append(nav);
				self.$el.append(page);
				return this;
			}
		});

		App.Views.Interests = Backbone.View.extend({
			el: '<ul>',
			initialize: function() {
				//_.bindAll('reset');
				var self = this;
				this.collection = collectionFactory('./ryanftp/json/interests.json');
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
					self.$el.empty();
					self.$el.append(li.append(title).append(content));
					
				});
				return this;
			}
		});

		App.Views.Work = Backbone.View.extend({
			el: '<ul>',
			initialize: function() {
				//_.bindAll('reset');
				var self = this;
				this.collection = collectionFactory('./ryanftp/json/work.json');
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
					self.$el.empty();
					self.$el.append(li.append(title).append(content));
					
				});
				return this;
			}
		});

		App.Routers.Main = Backbone.Router.extend({
			initialize: function(el) {
				this.el = el;
				this.mainView = new App.Views.Main();
				this.interestsView = new App.Views.Interests();
				this.workView = new App.Views.Work();
			},
			currentView: null,
			setMainView: function(view){
				this.el.html(view.el);
				view.render();
				this.showInterests();
			},
			switchView: function(view) {
				if (this.currentView) {
					// Detach the old view
					this.currentView.remove();
				}

				if (this.mainView) {
					// Move the view element into the DOM (replacing the old content)
					this.mainView.$el.find('#page').html(view.el);

					// Render view after it is in the DOM (styles are applied)
					view.render();

					this.currentView = view;
				}
			},
			routes: {
				'': 'showMain',
				'interests': 'showInterests',
				'work': 'showWork'
			},
			showMain: function() {
				this.setMainView(this.mainView);
			},
			showInterests: function(){
				this.switchView(this.interestsView);
			},
			showWork: function(){
				this.switchView(this.workView);
			}
		});

		var router = new App.Routers.Main($('#main'));
		Backbone.history.start();
	})();
});