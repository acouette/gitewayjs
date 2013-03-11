var giteway = giteway || {};
giteway.models = giteway.models || {};
giteway.collections = giteway.collections || {};



(function() {

	"use strict";

	var GITHUB_ROOT = "https://api.github.com";
	var GITHUB_REPO = "/repos/:owner/:repo";
	var COMMITS = "/commits";

	var Commit = Backbone.Model.extend({});

	var Commits = Backbone.Collection.extend({

		model: Commit,

		search: function(owner, name){
			this.url = GITHUB_ROOT + GITHUB_REPO.replace(":owner",owner).replace(":repo",name)+COMMITS;
			
			this.fetch({
				dataType: "jsonp"
			});
		},

		parse: function(response) {
	        return response.data;
	    }
		
	});

	giteway.models.Repository = Backbone.Model.extend({

		defaults: {
			commits: new Commits(),
			view: "timeline"
		},

		initialize: function(){
			this.get("commits").search(this.get("owner"),this.get("name"));
		},

		collaboration: function(){

			var result = {
				count: this.get("commits").length
			};

			var commitShare = 100 / result.count;

			result.data = this.get("commits").map(function(commit) {
				if(commit.get("author")){
					return commit.get("author").login;
				}
			}).reduce(function (prev, item) { 
			  if ( item in prev ) prev[item] += commitShare; 
			  	else prev[item] = commitShare; 
			  return prev; 
			}, {});

			return result;
		},

		timeline: function(){
			var dates = this.get("commits").map(function(commit) {
				if(commit.get("commit") && commit.get("commit").committer && commit.get("commit").committer.date){
					return new Date(Date.parse(commit.get("commit").committer.date)).getTime();
				}
			});
			
			var maxDate = Math.max.apply(null,dates);
			var minDate = Math.min.apply(null,dates);
			var range = maxDate - minDate;
			var step = range/10;

			var result = {
				range: range,
				step: step,
				count: dates.length
			};

			result.data = dates.reduce(function (prev, item) {
				var cursor = minDate;
				while(cursor + step < item){
					cursor+=step;
				}
				prev[cursor] = prev[cursor] || 0;
				prev[cursor]++;
				return prev;
			}, {});

			return result;
		}

	});

}());
