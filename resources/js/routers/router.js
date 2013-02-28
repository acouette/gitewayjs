var giteway = giteway || {};

(function() {

	"use strict";

	var Router = Backbone.Router.extend({
	

		routes:{
			"search/:keyword" : "searchRepos",
			'*other': 'init'
		},

		init: function( param ) {
			console.log("the router welcomes you to giteway");
		},

		searchRepos: function( keyword ) {

			giteway.Repositories.search(keyword);
			console.log("the router searchRepos");
		}
		
	});

	giteway.gitewayRouter = new Router();

	Backbone.history.start();

}());
