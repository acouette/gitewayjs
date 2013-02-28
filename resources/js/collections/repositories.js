var giteway = giteway || {};


var GITHUB_ROOT = "https://api.github.com";
var GITHUB_SEARCH_REPO = "/legacy/repos/search/";


(function() {

	"use strict";

	var Repositories = Backbone.Collection.extend({

		model: giteway.Repository,

		// Save all of the todo items under the `"todos"` namespace.
		//localStorage: new Store('repositories-backbone')
		

		search: function(keyword){
			this.url = GITHUB_ROOT+GITHUB_SEARCH_REPO+keyword;
			this.fetch({
				dataType: "jsonp",
				success: function(data){
					console.log(data);
				}
			});
		}

	});

	giteway.Repositories = new Repositories();

}());

