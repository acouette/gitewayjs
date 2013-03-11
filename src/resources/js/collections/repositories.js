var giteway = giteway || {};
giteway.collections = giteway.collections || {};

var GITHUB_ROOT = "https://api.github.com";
var GITHUB_SEARCH_REPO = "/legacy/repos/search/";


(function() {

	"use strict";

	var Repository = Backbone.Model.extend();

	var Repositories = Backbone.Collection.extend({

		model: Repository,

		keyword: "",

		search: function(keyword){
			this.keyword = keyword;
			this.url = GITHUB_ROOT + GITHUB_SEARCH_REPO + encodeURIComponent(keyword);
			
			this.fetch({
				dataType: "jsonp"
			});
		},

		parse: function(response) {
	        return response.data.repositories;
	    }

	});

	giteway.collections.repositories = new Repositories();

}());

