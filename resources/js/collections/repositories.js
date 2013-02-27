var giteway = giteway || {};



(function() {

	"use strict";

	var Repositories = Backbone.Collection.extend({

		model: giteway.Repository,

		// Save all of the todo items under the `"todos"` namespace.
		localStorage: new Store('repositories-backbone')
		
	});

	giteway.Repositories = new Repositories();

}());

