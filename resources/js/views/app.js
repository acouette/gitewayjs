var giteway = giteway || {};
giteway.views = giteway.views || {};


(function() {

	"use strict";

	giteway.views.App = Backbone.View.extend({
	
		el: "#container",

		template: _.template($('#repositories-header-template').html()),

		events: {
			"click #search-button" : "search",
			"keypress #keyword" : "searchOnEnter"
		},

		initialize: function() {
			this.$input = this.$("#keyword");

			this.listenTo(giteway.collections.repositories, 'reset', this.addAll);
			this.listenTo(giteway.collections.repositories, 'request', this.request);
			
		},

		render: function() {
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

		addAll: function() {
			$('#result-list').html(this.template());
			this.$input.val(giteway.collections.repositories.keyword);
			giteway.collections.repositories.each(this.addOne, this);
		},

		addOne: function(repo) {
			var view = new giteway.views.Repositories({ model: repo });
			$('#repo-list').append(view.render().el);
		},

		request: function() {
			$('#result-list').html("requesting...");
		}
		
	});


}());