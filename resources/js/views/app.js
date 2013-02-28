var giteway = giteway || {};



(function() {

	"use strict";

	giteway.AppView = Backbone.View.extend({
	
		el: "#container",

		events: {
			"click #search-button" : "search",
			"keypress #keyword" : "searchOnEnter"
			
		},

		initialize: function() {
			this.$input = this.$("#keyword");


			this.listenTo(giteway.Repositories, 'change', this.addOne);
		},

		render: function() {

		},


		search : function(event){
			console.log("search");

			var inputValue = this.$input.val().trim();
			if (!inputValue ) {
				return;
			}

			console.log("search 2");
			giteway.gitewayRouter.navigate("search/"+inputValue, true);
		},

		searchOnEnter : function(e){
			console.log("search on enter");

			if ( e.which !== ENTER_KEY ) {
				return;
			}

			this.search();
		},

		addOne: function(repo) {
			console.log("new repo !");
			var view = new giteway.TodoView({ model: repo });
			$('#repo-list').append(view.render().el);
		}

		
	});


}());