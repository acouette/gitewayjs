var giteway = giteway || {};

(function() {

	"use strict";

	var Router = Backbone.Router.extend({
	
		currentView: undefined,

		routes:{
			"search/:keyword" : "searchRepos",
			"repo/:owner/:name" : "statistics",
			'*other': 'init'
		},

		init: function() {
			console.log("init");
		},

		searchRepos: function( keyword ) {
			giteway.collections.repositories.search(keyword);
		},

		statistics: function(owner,name) {
			if(this.currentView){
				this.currentView.remove();
			}

			var repo = new giteway.models.Repository({
				owner: owner,
				name: name
			});

			this.currentView = new giteway.views.Statistics({
				model: repo
			});

		}
		
	});

	giteway.router = new Router();

}());