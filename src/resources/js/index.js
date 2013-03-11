$(function() {

	giteway.views.search = new giteway.views.Search({
		model: giteway.collections.repositories
	});
	
	Backbone.history.start();
});