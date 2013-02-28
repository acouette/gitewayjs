var giteway = giteway || {};

(function() {

	"use strict";

	var Router = Backbone.Router.extend({
	

		routes:{
			"search/:keyword" : "searchRepos",
			'*other': 'init'
		},

		init: function( param ) {
		},

		searchRepos: function( keyword ) {
			giteway.collections.repositories.search(keyword);
		}
		
	});

	giteway.router = new Router();

	Backbone.history.start();

}());
