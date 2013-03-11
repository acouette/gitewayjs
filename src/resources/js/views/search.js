var giteway = giteway || {};
giteway.views = giteway.views || {};

var ENTER_KEY = 13;

(function() {

	"use strict";

	function throttle(method, context) {
		clearTimeout(method.tId);
		method.tId= setTimeout(function(){
		method.call(context);
		}, 100);
	}

	giteway.views.Search = Backbone.View.extend({
	
		el: "#container",

		template: _.template($('#repositories-header-template').html()),

		events: {
			"click #search-button" : "search",
			"keypress #keyword" : "searchOnEnter"
		},

		initialize: function() {
			this.$input = this.$("#keyword");
			this.$result = this.$("#result");

			this.listenTo(this.model, 'reset', this.render);
			this.listenTo(this.model, 'request', this.request);
			
			var that = this;
			$(window).resize(function(){
				throttle(that.renderOnResize,this);
			});
		},

		renderOnResize: function() {
			console.log("onresize"+this.$el);
		},

		render: function() {
			this.$result.html(this.template());
			var repoList = $('#repo-list');
			var RepoView = giteway.views.Repositories;
			this.model.each(function(repo) {
				var view = new RepoView({ model: repo });
				repoList.append(view.render().el);
			}, this);
			return this;
		},


		search : function(event){
			var inputValue = this.$input.val().trim();
			if (!inputValue ) {
				return;
			}
			giteway.router.navigate("search/"+inputValue, true);
		},

		searchOnEnter : function(e){
			if ( e.which !== ENTER_KEY ) {
				return;
			}
			this.search();
		},

		request: function() {
			this.$input.val(this.model.keyword);
			this.$result.html("requesting...");
		}
		
	});

	


}());