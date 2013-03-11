var giteway = giteway || {};
giteway.views = giteway.views || {};


(function() {

	"use strict";

	giteway.views.Repositories = Backbone.View.extend({
	
		tagName: "tr",

		className: function(){
			return (!!(Number(this.model.cid.slice(1))%2)) ? "even" : "";
		},

		template: _.template($('#repositories-template').html()),

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
		
	});


}());